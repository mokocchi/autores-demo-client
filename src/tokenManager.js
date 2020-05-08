import { apiUserFound, apiUserExpired, loadingApiUser } from './redux/actions';
import { expired } from './utils';
import APIClient from './APIClient';
import { userSignedOut } from 'redux-oidc';

export default class tokenManager {

    static store = null;

    static initialize(store) {
        this.store = store;
        this.client = new APIClient();
        this.client._events._tokenNotFound.addHandler(() => {
            this.store.dispatch(userSignedOut());
        })
        this.client._events._apiUserFound.addHandler((auth) => {
            this.store.dispatch(apiUserFound(auth));
            tokenManager.storeApiUser(auth.token);
        })
    }

    static removeApiUser() {
        localStorage.removeItem('auth.token');
    }

    static async delay() {
        await setTimeout(1);
    }

    static isAuthorized() {
        const token = this.client.getToken();
        return token != null;
    }

    static async loadApiUser() {
        this.store.dispatch(loadingApiUser());
        const tokenString = localStorage.getItem('auth.token');
        let token = null;
        if (tokenString) {
            token = JSON.parse(tokenString);
        };
        if (token && token.accessToken && expired(token.expiresAt)) {
            if (this.store.getState().oidc.isLoadingUser) {
                await this.delay();
                console.log("retry");
                if (!this.store.getState().oidc.isLoadingUser) {
                    if (this.store.getState().oidc.user) {
                        const auth = await this.fetchAuth(this.store.getState().oidc.user.id_token)
                        token = auth.token;
                        this.storeApiUser(token);
                    } else {
                        console.log("not logged in");
                    }
                } else {
                    console.log("still no")
                }
            }
        }
        if (token && token.accessToken && !expired(token.expiresAt)) {
            this.client.setToken(token);
            try {
                if(token.oauth) {
                    this.client.setOauth();
                }
                const user = await this.client.me();
                this.store.dispatch(apiUserFound({ token, user }));
            } catch (error) {
                if(window.location.pathname !== "/callback") {
                    localStorage.setItem('returnPath', window.location.pathname + window.location.search);
                }
                this.store.dispatch(apiUserExpired());
            }
        } else {
            if(window.location.pathname !== "/callback") {
                localStorage.setItem('returnPath', window.location.pathname + window.location.search);
            }
            this.store.dispatch(apiUserExpired());
        }
    }

    static storeApiUser(token) {
        localStorage.setItem('auth.token', JSON.stringify(token));
        this.client.setToken(token);
    }

    static fetchAuth(id_token) {
        return this.client.fetchAuth(id_token);
    }

    static authorizedGetRequest(uri) {
        return this.client.authorizedGetRequest(uri);
    }

    static publicGetRequest(uri) {
        return this.client.unauthorizedRequest(uri);
    }

    static getActividadesPublic() {
        return this.client.getActividadesPublic();
    }

    static getActividadPublic(id) {
        return this.client.getActividadPublic(id);
    }

    static getActividad(id) {
        return this.client.getActividad(id);
    }

    static getTarea(id) {
        return this.client.getTarea(id);
    }

    static getTareaPublic(id) {
        return this.client.getTareaPublic(id);
    }

    static getTareasPublic() {
        return this.client.getTareasPublic();
    }

    static getTareasForActividad(id) {
        return this.client.getTareasForActividad(id);
    }

    static getTareasForActividadPublic(id) {
        return this.client.getTareasForActividadPublic(id);
    }

    static getPlanificacionForActividad(id) {
        return this.client.getPlanificacionForActividad(id);
    }

    static getPlanificacionForActividadPublic(id) {
        return this.client.getPlanificacionForActividadPublic(id);
    }

    static getMisActividades() {
        return this.client.getMisActividades();
    }

    static getMisTareas() {
        return this.client.getMisTareas();
    }

    static createDominio(dominio) {
        return this.client.postDominio(dominio);
    }

    static createActividad(actividad) {
        return this.client.postActividad(actividad);
    }

    static createTarea(tarea) {
        return this.client.postTarea(tarea);
    }

    static addExtraToTarea(extra, tarea) {
        return this.client.postExtraToTarea(extra, tarea)
    }

    static addPlanoToTarea(plano, tarea) {
        return this.client.postFilePlanoToTarea(plano, tarea)
    }

    static setTareasToActividad(tarea, actividad) {
        return this.client.putTareasToActividad(tarea, actividad);
    }

    static setPlanificacionInActividad(planificacion, actividad) {
        return this.client.putPlanificacionToActividad(planificacion, actividad);
    }

    static deleteSaltosFromActividad(actividad) {
        return this.client.deleteSaltosFromActividad(actividad);
    }

    static deleteTareasFromActividad(actividad) {
        return this.client.deleteTareasFromActividad(actividad);
    }
}
