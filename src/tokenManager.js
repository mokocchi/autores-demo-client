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
        this.client._events._apiUserFound.addHandler((auth)=> {
            this.store.dispatch(apiUserFound(auth));
            tokenManager.storeApiUser(auth.token);
        })
    }

    static removeApiUser() {
        localStorage.removeItem('auth.token');
    }

    static async loadApiUser() {
        this.store.dispatch(loadingApiUser());
        const tokenString = localStorage.getItem('auth.token');
        let token = null;
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        if (token && token.accessToken && !expired(token.expiresAt)) {
            this.client.setToken(token);
            const user = await this.client.me();
            this.store.dispatch(apiUserFound({token, user}));
        } else {
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

    static genericGetRequest(uri) {
        return this.client.genericGetRequest(uri);
    }

    static getActividades() {
        return this.client.getActividades();
    }

    static getActividad(id) {
        return this.client.getActividad(id);
    }

    static getTarea(id) {
        return this.client.getTarea(id);
    }

    static getTareasForActividad(id) {
        return this.client.getTareasForActividad(id);
    }
    
    static getMisActividades() {
        return this.client.getMisActividades();
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

    static addTareaToActividad(tarea, actividad) {
        return this.client.postTareaToActividad(tarea, actividad);
    }

    static addSaltoToActividad(salto, actividad) {
        return this.client.postSaltoToActividad(salto, actividad);
    }
    
    static setPlanificacionInActividad(planificacion, actividad) {
        return this.client.postPlanificacionToActividad(planificacion, actividad);
    }

    static deleteSaltosFromActividad(actividad) {
        return this.client.deleteSaltosFromActividad(actividad);
    }
}
