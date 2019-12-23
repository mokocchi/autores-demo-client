import {
    SET_TAREA_EXTRA, CLEAR_TAREA_EXTRA, ADD_ELEMENT_TO_EXTRA, REMOVE_ELEMENT_FROM_EXTRA,
    ADD_VALID_ELEMENT_TO_EXTRA, REMOVE_VALID_ELEMENT_FROM_EXTRA, ADD_BYSCORE_CRITERION,
    ADD_SCORE_TO_CRITERION, REMOVE_SCORE_FROM_CRITERIA, REMOVE_BYSCORE_CRITERION
} from '../actions'
const INIT_STATE = {
    elements: [],
    validElements: [],
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
        case ADD_ELEMENT_TO_EXTRA:
            let index = state.elements.findIndex(element => element.text === action.element.text);

            if (index !== -1)
                return state;

            return {
                ...state,
                elements: [...state.elements, action.element]
            }
        case REMOVE_ELEMENT_FROM_EXTRA:
            return {
                ...state,
                elements: state.elements.filter((item) => item.code !== action.element.code)
            }
        case ADD_VALID_ELEMENT_TO_EXTRA:
            let validIndex = state.validElements.findIndex(element => element === action.element);

            if (validIndex !== -1)
                return state;

            return {
                ...state,
                validElements: [...state.validElements, action.element]
            }
        case REMOVE_VALID_ELEMENT_FROM_EXTRA:
            return {
                ...state,
                validElements: state.validElements.filter((item) => item !== action.element)
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