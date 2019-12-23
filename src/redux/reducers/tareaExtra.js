import {
    SET_TAREA_EXTRA, CLEAR_TAREA_EXTRA, ADD_OPTION_TO_EXTRA, REMOVE_OPTION_FROM_EXTRA,
    ADD_CORRECT_ANSWER_TO_EXTRA, REMOVE_CORRECT_ANSWER_FROM_EXTRA, ADD_BYSCORE_CRITERION,
    ADD_SCORE_TO_CRITERION, REMOVE_SCORE_FROM_CRITERIA, REMOVE_BYSCORE_CRITERION
} from '../actions'
const INIT_STATE = {
    options: [],
    correctAnswers: [],
    byScore: []
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
        case ADD_BYSCORE_CRITERION:
            let criterionIndex = state.byScore.findIndex(item => item.name === action.criterion.name);

            if (criterionIndex !== -1)
                return state

            return {
                ...state,
                byScore: [...state.byScore, action.criterion],
            }
        case REMOVE_BYSCORE_CRITERION:
            return {
                ...state,
                byScore: state.byScore.filter(item => item.name !== action.criterion.name)
            }
        case ADD_SCORE_TO_CRITERION:
            let currentCriterion = state.byScore.find(item => item.name === action.criterionName)
            let criterion = {
                ...currentCriterion,
                scores: {
                    ...currentCriterion.scores,
                    [action.score.code]: action.score.value
                }
            }
            let byScore = state.byScore.filter(item => item.name !== criterion.name);
            return {
                ...state,
                byScore: [...byScore, criterion]
            }
        case REMOVE_SCORE_FROM_CRITERIA:
            let scores = state.byScore.map(item => {
                const { [action.code]: value, ...withoutKey } = item.scores
                return {
                    ...item,
                    scores: withoutKey
                }
            });
            return {
                ...state,
                byScore: scores
            }
        default:
            return state;
    }
}