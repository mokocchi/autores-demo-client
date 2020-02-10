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
        localStorage.removeItem('auth.token');
    }

    static loadApiUser(store) {
        const tokenString = localStorage.getItem('auth.token');
        let token = null;
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        if (token && !expired(token.expiresAt)) {
            store.dispatch(apiUserFound(token));
        } else {
            store.dispatch(apiUserExpired());
        }
    }

    static storeApiUser(token) {
        localStorage.setItem('auth.token', JSON.stringify(token));
    }

    static async fetchApiUser(id_token) {
        this.client.fetchApiUser(id_token);
    }
}
