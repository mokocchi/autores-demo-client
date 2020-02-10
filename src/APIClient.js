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
            const token = tokenManager.fetchApiUser(id_token);
            if (token && token.accessToken) {
                this._events._apiUserFound.raise(token);
                return token;
            } else {
                this._events._tokenNotFound.raise();
                return null
            } 
        } else {
            return token;
        }
    }

    async fetchApiUser(id_token) {
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
            const token ={
                accessToken: data.access_token,
                expiresAt: expiresAt(data.expires_in)
            }
            this.token = token;
            return token;
        }
    }

    async getActividades() {
        const token = this.getToken();
        if (token && token.accessToken) {
            const response = await fetch(API_BASE_URL + '/actividades', {
                headers: {
                    "Authorization": "Bearer " + token.accessToken
                }
            });
            return await response.json();
        } else {
            return { errors: "No autorizado" }
        }
    }
}