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

    static async fetchAuth(id_token) {
        return await this.client.fetchAuth(id_token);
    }

    static async getActividades() {
        return await this.client.getActividades();
    }
}
