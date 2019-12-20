import { SET_CURRENT_ACTIVIDAD } from '../actions'
export default function actividad (state={
    currentActividad: {}
}, action) {
    switch (action.type) {
        case SET_CURRENT_ACTIVIDAD:
            return {...state, 
                currentActividad: action.actividad}
        default:
            return state;
    }
}