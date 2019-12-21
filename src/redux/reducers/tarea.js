import { SET_TAREA_EXTRA, CLEAR_TAREA_EXTRA } from '../actions'
export default function tarea (state={
    extra: {}
}, action) {
    switch (action.type) {
        case SET_TAREA_EXTRA:
            return {...state, 
                extra: action.extra};
        case CLEAR_TAREA_EXTRA:
            return {...state,
                extra: {}
            }
        default:
            return state;
    }
}