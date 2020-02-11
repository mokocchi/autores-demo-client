import tokenManager from "./tokenManager";
import APIClientEvents from "./APIClientEvents";
import { TOKEN_AUTH_URL, API_BASE_URL } from "./config";
import { expired, expiresAt } from "./utils";

export default class APIClient {
    constructor() {
        this._events = new APIClientEvents();
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        const token = this.token;
        if (!token || expired(token.expiresAt)) {
            const id_token = tokenManager.store.getState().oidc.user.id_token;
            const auth = tokenManager.fetchAuth(id_token);
            if (auth && auth.token && auth.token.accessToken) {
                this._events._apiUserFound.raise(auth);
                return token;
            } else {
                this._events._tokenNotFound.raise();
                return null
            }
        } else {
            return token;
        }
    }

    async fetchAuth (id_token) {
        const token = await this.fetchToken(id_token);
        const user = await this.authorizedRequest(token, '/me');
        return {
            token, user
        }
    }

    async fetchToken(id_token) {
        const response = await fetch(TOKEN_AUTH_URL, {
            method: 'POST',
            headers: {
                "X-AUTH-TOKEN": true
            },
            body: JSON.stringify({
                "token": id_token
            })
        });
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors);
            return null
        } else {
            const token = {
                accessToken: data.access_token,
                expiresAt: expiresAt(data.expires_in)
            }
            this.token = token;
            return token;
        }
    }

    async authorizedRequest(token, uri, parameters={}) {
        if (token && token.accessToken) {
            parameters.headers = {
                "Authorization": "Bearer " + token.accessToken
            }
            const response = await fetch(API_BASE_URL + uri, parameters);
            return await response.json();
        } else {
            return { errors: "No autorizado" }
        }
    }

    getActividades() {
        const token = this.getToken();
        return this.authorizedRequest(token, '/actividades');
    }

    me() {
        const token = this.getToken();
        return this.authorizedRequest(token, '/me')
    }
}