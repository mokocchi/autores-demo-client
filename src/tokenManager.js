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
            tokenManager.storeApiUser(auth);
        })
    }

    static removeApiUser() {
        localStorage.removeItem('auth.user');
    }

    static loadApiUser() {
        this.store.dispatch(loadingApiUser());
        const authString = localStorage.getItem('auth.user');
        let auth = null;
        if (authString) {
            auth = JSON.parse(authString);
        }
        if (auth && auth.token && auth.token.accessToken && !expired(auth.token.expiresAt)) {
            this.store.dispatch(apiUserFound(auth));
            this.client.setToken(auth.token);
        } else {
            this.store.dispatch(apiUserExpired());
        }
    }

    static storeApiUser(auth) {
        localStorage.setItem('auth.user', JSON.stringify(auth));
        this.client.setToken(auth.token);
    }

    static async fetchAuth(id_token) {
        return await this.client.fetchAuth(id_token);
    }

    static async getActividades() {
        return await this.client.getActividades();
    }
}
