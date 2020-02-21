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
            const state = tokenManager.store.getState();
            if (state.oidc && state.oidc.user) {
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
                this._events._tokenNotFound.raise();
                return null
            }
        } else {
            return token;
        }
    }

    async fetchAuth(id_token) {
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
        if (data.error_code) {
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

    async authorizedRequest(token, uri, parameters = {}) {
        if (token && token.accessToken) {
            parameters.headers = {
                "Authorization": "Bearer " + token.accessToken
            }
            const response = await fetch(API_BASE_URL + uri, parameters);
            return await response.json();
        } else {
            return { user_message: "No autorizado", error_code: 0 }
        }
    }

    async unauthorizedRequest(uri, parameters = {}) {
        const response = await fetch(API_BASE_URL + '/public' + uri, parameters);
        return await response.json();
    }

    authorizedGetRequest(uri) {
        const token = this.getToken();
        return this.authorizedRequest(token, uri);
    }

    authorizedPostRequest(uri, object, stringify = true) {
        const token = this.getToken();
        return this.authorizedRequest(token, uri, {
            body: stringify ? JSON.stringify(object) : object,
            method: 'POST'
        })
    }

    authorizedPutRequest(uri, object, stringify = true) {
        const token = this.getToken();
        return this.authorizedRequest(token, uri, {
            body: stringify ? JSON.stringify(object) : object,
            method: 'PUT'
        })
    }

    authorizedDeleteRequest(uri) {
        const token = this.getToken();
        return this.authorizedRequest(token, uri, { method: 'DELETE' });
    }


    me() {
        return this.authorizedGetRequest('/me');
    }


    getActividadesPublic() {
        return this.unauthorizedRequest('/actividades');
    }

    getMisActividades() {
        return this.authorizedGetRequest('/actividades/user');
    }

    getActividad(id) {
        return this.authorizedGetRequest('/actividades/' + id);
    }

    getMisTareas() {
        return this.authorizedGetRequest('/tareas/user');
    }

    getTarea(id) {
        return this.authorizedGetRequest('/tareas/' + id);
    }

    getTareaPublic(id) {
        return this.unauthorizedRequest('/tareas/' + id);
    }

    getTareasPublic() {
        return this.unauthorizedRequest('/tareas');
    }

    getTareasForActividad(id) {
        return this.authorizedGetRequest('/actividades/' + id + '/tareas');
    }

    getPlanificacionForActividad(id) {
        return this.authorizedGetRequest('/actividades/' + id + '/planificaciones/1')
    }

    postDominio(dominio) {
        return this.authorizedPostRequest('/dominios', dominio);
    }

    postActividad(actividad) {
        return this.authorizedPostRequest('/actividades', actividad);
    }

    postTarea(tarea) {
        return this.authorizedPostRequest('/tareas', tarea);
    }

    postExtraToTarea(extra, tarea) {
        return this.authorizedPostRequest('/tareas/' + tarea + '/extra', extra);
    }

    putTareasToActividad(tarea, actividad) {
        return this.authorizedPutRequest('/actividades/' + actividad + '/tareas', tarea);
    }

    postSaltoToActividad(salto, actividad) {
        return this.authorizedPostRequest('/actividades/' + actividad + '/saltos', salto);
    }

    putPlanificacionToActividad(planificacion, actividad) {
        return this.authorizedPutRequest('/actividades/' + actividad + '/planificaciones/1', planificacion);
    }

    postFilePlanoToTarea(plano, tarea) {
        return this.authorizedPostRequest('/tareas/' + tarea + '/plano', plano, false)
    }

    deleteSaltosFromActividad(actividad) {
        return this.authorizedDeleteRequest('/actividades/' + actividad + '/saltos');
    }

    deleteTareasFromActividad(actividad) {
        return this.authorizedDeleteRequest('/actividades/' + actividad + '/tareas');
    }
}