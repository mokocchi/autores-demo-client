import { API_USER_FOUND, API_USER_EXPIRED, LOADING_API_USER } from "../actions";

const INITIAL_STATE = {
    user: {
        accessToken: "",
        roles: [],
        isLoading: false
    }
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case API_USER_FOUND:
            return {
                ...state,
                accessToken: action.accessToken
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