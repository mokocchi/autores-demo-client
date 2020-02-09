import { apiUserFound, apiUserExpired } from './redux/actions';
import { expired, expiresAt } from './utils';
import { TOKEN_AUTH_URL } from './config';

export default class tokenManager {
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
            return {
                accessToken: data.access_token,
                expiresAt: expiresAt(data.expires_in)
            }
        }
    }
}
