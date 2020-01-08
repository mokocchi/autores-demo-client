import {
    SET_TAREA_EXTRA, CLEAR_TAREA_EXTRA, ADD_ELEMENT_TO_EXTRA, REMOVE_ELEMENT_FROM_EXTRA,
    ADD_VALID_ELEMENT_TO_EXTRA, REMOVE_VALID_ELEMENT_FROM_EXTRA, ADD_BYSCORE_CRITERION,
    ADD_SCORE_TO_CRITERION, REMOVE_SCORE_FROM_CRITERIA, REMOVE_BYSCORE_CRITERION,
    ADD_DEPOSIT_TO_ELEMENT,
    REMOVE_DEPOSIT_FROM_ELEMENT
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
            let index = state.elements.findIndex(element => element.name === action.element.name);

            if (index !== -1)
                return state;

            return {
                ...state,
                elements: [...state.elements, action.element]
            }
        case REMOVE_ELEMENT_FROM_EXTRA:
            return {
                ...state,
                elements: state.elements.filter((item) => item.code !== action.element.code),
                validElements: state.validElements.filter((item) => item !== action.element.code)
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
            return {
                ...state,
                byScore: state.byScore.map(item => {
                    if (item.name !== action.criterionName) { return item }
                    else { return criterion }
                })
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
        case ADD_DEPOSIT_TO_ELEMENT:
            const element = state.elements.find(elem => elem.code === action.elementCode);
            if (element.deposits) {
                const depositIndex = element.deposits.findIndex(elem => elem === action.depositCode);
                if (depositIndex !== -1) {
                    return state
                }
            } else {
                element.deposits = []
            }
            element.deposits = [...element.deposits, action.depositCode];
            return {
                ...state,
                elements: state.elements.map(elem => {
                    if (elem.code !== action.elementCode) { return elem }
                    else { return element }
                })
            }
        case REMOVE_DEPOSIT_FROM_ELEMENT:
            const element2 = state.elements.find(elem => elem.code === action.elementCode);
            element2.deposits = element2.deposits.filter(elem => elem !== action.depositCode);
            if (element2.deposits) {
                return {
                    ...state,
                    elements: state.elements.map(elem => {
                        if (elem.code !== action.elementCode) { return elem }
                        else { return element2 }
                    })
                }
            } else {
                return state;
            }
        default:
            return state;
    }
}