import { INVALIDATE_ATTRIBUTE, REQUEST_OPTIONS, RECEIVE_OPTIONS, FAIL_ATTRIBUTE, ADD_SELECT_OPTION } from '../actions'

function options(
    state = {
        isFetching: false,
        didInvalidate: false,
        error: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case FAIL_ATTRIBUTE:
            return { ...state, isFetching: false, error: true }
        case INVALIDATE_ATTRIBUTE:
            return { ...state, didInvalidate: true }
        case REQUEST_OPTIONS:
            return { ...state, isFetching: true, didInvalidate: false }
        case RECEIVE_OPTIONS:
            return {
                ...state,
                isFetching: false,
                error: false,
                items: action.options,
                lastUpdated: action.receivedAt
            }
        case ADD_SELECT_OPTION:
            const index = state.items.findIndex(item => item.nombre === action.option.nombre);
            if (index === -1) {
                return {
                    ...state,
                    items: [...state.items, action.option]
                }
            } else {
                return state;
            }
        default:
            return state
    }
}

export default function optionsByAttribute(state = {}, action) {
    switch (action.type) {
        case FAIL_ATTRIBUTE:
        case INVALIDATE_ATTRIBUTE:
        case RECEIVE_OPTIONS:
        case REQUEST_OPTIONS:
        case ADD_SELECT_OPTION:
            return Object.assign({}, state, {
                [action.attribute]: options(state[action.attribute], action)
            })
        default:
            return state
    }
}