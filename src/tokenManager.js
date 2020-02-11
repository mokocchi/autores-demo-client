import { apiUserFound, apiUserExpired } from './redux/actions';
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
        this.client._events._apiUserFound.addHandler((token)=> {
            this.store.dispatch(apiUserFound(token));
            tokenManager.storeApiUser(token);
        })
    }

    static removeApiUser() {
        localStorage.removeItem('auth.user');
    }

    static loadApiUser() {
        const tokenString = localStorage.getItem('auth.user');
        let token = null;
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        if (token && token.accessToken && !expired(token.expiresAt)) {
            this.store.dispatch(apiUserFound(token));
            this.client.setToken(token);
        } else {
            this.store.dispatch(apiUserExpired());
        }
    }

    static async storeApiUser(token) {
        const user = await this.client.me();
        token.user = {
            googleid: user.googleid,
            roles: user.roles
        }
        localStorage.setItem('auth.user', JSON.stringify(token));
        this.client.setToken(token);
    }

    static async fetchApiUser(id_token) {
        return await this.client.fetchApiUser(id_token);
    }

    static async getActividades() {
        return await this.client.getActividades();
    }
}
