import { userSignedOut } from "redux-oidc";
import { apiUserFound } from "./redux/actions";
import tokenManager from "./tokenManager";
import APIClientEvents from "./APIClientEvents";
import { TOKEN_AUTH_URL, API_BASE_URL } from "./config";
import { expired, expiresAt } from "./utils";

export default class APIClient {
    constructor() {
        this._events = new APIClientEvents();
    }

    getToken() {
        const token = this.props.token;
        if (expired(token.expiresAt)) {
            const token = tokenManager.fetchApiUser(this.props.user.id_token);
            if (!token) {
                this._events._tokenNotFound.raise();
                return null
            } else {
                this._events._apiUserFound.raise(token);
                return token;
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
        alert(response);
        if (data.errors) {
            console.log(data.errors);
            return null
        } else {
            return {
                accessToken: data.access_token,
                expiresAt: expiresAt(data.expires_in)
            }
        }
    }

    async getActividades() {
        const token = this.getToken();
        if (token) {
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