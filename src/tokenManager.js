import { apiUserFound, apiUserExpired } from './redux/actions';
import { expired, expiresAt } from './utils';

export default class tokenManager {
    static removeApiUser() {
        sessionStorage.removeItem('auth.token');
    }

    static loadApiUser(store) {
        const tokenString = sessionStorage.getItem('auth.token');
        let token = null;
        if(tokenString) {
            token = JSON.parse(tokenString);
        }
        if(token && !expired(token.expiresAt)) {
            store.dispatch(apiUserFound(token.accessToken));
        } else {
            store.dispatch(apiUserExpired());
        }
    }

    static storeApiUser(accessToken, expiresIn){
        const token = {
            accessToken: accessToken,
            expiresAt: expiresAt(expiresIn)
        }
        sessionStorage.setItem('auth.token', JSON.stringify(token));
    }
}
