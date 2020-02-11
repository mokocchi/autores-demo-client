import { API_USER_FOUND, API_USER_EXPIRED, LOADING_API_USER } from "../actions";

const INITIAL_STATE = {
    token: {
        accessToken: null,
        expiresAt: null
    },
    roles: [],
    googleid: null,
    isLoading: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case API_USER_FOUND:
            return {
                ...state,
                token: action.auth.token,
                role: action.auth.user.roles[0].name,
                googleid: action.auth.user.googleid,
                isLoading: false
            }
        case API_USER_EXPIRED:
            return INITIAL_STATE;
        case LOADING_API_USER:
            return {
                ...INITIAL_STATE,
                isLoading: true
            }
        default:
            return state;
    }
}