import { Event } from 'oidc-client/src/Event';

export default class APIClientEvents {

    constructor() {
        this._tokenNotFound = new Event("Token not found");
        this._apiUserFound = new Event("Api user found");
    }

    _raiseTokenNotFound(e) {
        this._tokenNotFound.raise(e);
    }

    addTokenNotFound(cb) {
        this._tokenNotFound.addHandler(cb);
    }

    removeTokenNotFound(cb) {
        this._tokenNotFound.removeHandler(cb);
    }

    _raiseApiUserFound(e){
        this._apiUserFound.raise(e);
    }

    addApiUserFound(cb) {
        this._apiUserFound.addHandler(cb);
    }

    removeApiUserFound(cb) {
        this._apiUserFound.removeHandler(cb);
    }
}