import { SET_TAREA_EXTRA, CLEAR_TAREA_EXTRA, ADD_OPTION_TO_EXTRA, REMOVE_OPTION_FROM_EXTRA } from '../actions'
export default function tareaExtra(state = {
        options: []
}, action) {
    switch (action.type) {
        case SET_TAREA_EXTRA:
            return {
                ...state,
                extra: action.extra
            };
        case CLEAR_TAREA_EXTRA:
            return {
                options: []
            };
        case ADD_OPTION_TO_EXTRA:
            let index = state.options.findIndex(option => option.text === action.option.text);

            if (index !== -1)
                return state;

            return {
                ...state,
                options: [...state.options, action.option]
            }
        case REMOVE_OPTION_FROM_EXTRA:
            return {
                ...state,
                options: state.options.filter((item) => item.code != action.option.code)
            }
        default:
            return state;
    }
}