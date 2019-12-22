import { SET_TAREA_EXTRA, CLEAR_TAREA_EXTRA, ADD_OPTION_TO_EXTRA, REMOVE_OPTION_FROM_EXTRA, ADD_CORRECT_ANSWER_TO_EXTRA, REMOVE_CORRECT_ANSWER_FROM_EXTRA } from '../actions'
const INIT_STATE = {
    options: [],
    correctAnswers: []
};
export default function tareaExtra(state = INIT_STATE, action) {
    switch (action.type) {
        case SET_TAREA_EXTRA:
            return {
                ...state,
                extra: action.extra
            };
        case CLEAR_TAREA_EXTRA:
            return INIT_STATE
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
                options: state.options.filter((item) => item.code !== action.option.code)
            }
        case ADD_CORRECT_ANSWER_TO_EXTRA:
            let correctIndex = state.correctAnswers.findIndex(option => option === action.option);

            if (correctIndex !== -1)
                return state;

            return {
                ...state,
                correctAnswers: [...state.correctAnswers, action.option]
            }
        case REMOVE_CORRECT_ANSWER_FROM_EXTRA:
            return {
                ...state,
                correctAnswers: state.correctAnswers.filter((item) => item !== action.option)
            }
        default:
            return state;
    }
}