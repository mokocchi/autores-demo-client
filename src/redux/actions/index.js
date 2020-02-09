// optionsByAttribute
export const FAIL_ATTRIBUTE = 'FAIL_ATTRIBUTE'

export function failAttribute(attribute) {
  return {
    type: FAIL_ATTRIBUTE,
    attribute
  }
}

export const INVALIDATE_ATTRIBUTE = 'INVALIDATE_ATTRIBUTE';

export function invalidateAttribute(attribute) {
  return {
    type: INVALIDATE_ATTRIBUTE,
    attribute
  }
}

export const REQUEST_OPTIONS = 'REQUEST_OPTIONS'

export function requestOptions(attribute) {
  return {
    type: REQUEST_OPTIONS,
    attribute
  }
}

export const RECEIVE_OPTIONS = 'RECEIVE_OPTIONS'

export function receiveOptions(attribute, options) {
  return {
    type: RECEIVE_OPTIONS,
    attribute,
    options
  }
}

export const ADD_SELECT_OPTION = 'ADD_SELECT_OPTION'

export function addSelectOption(attribute, option) {
  return {
    type: ADD_SELECT_OPTION,
    attribute,
    option
  }
}

// actividadTareas
export const SELECT_TAREA = 'SELECT_TAREA'

export function selectTarea(id) {
  return {
    type: SELECT_TAREA,
    id
  }
}

export const CHOOSE_TAREA = 'CHOOSE_TAREA'

export function chooseTarea() {
  return {
    type: CHOOSE_TAREA
  }
}

export const UNCHOOSE_TAREA = 'UNCHOOSE_TAREA'

export function unchooseTarea(id) {
  return {
    type: UNCHOOSE_TAREA,
    id
  }
}

export const ADD_TAREA = 'ADD_TAREA'

export function addTarea(tarea) {
  return {
    type: ADD_TAREA,
    tarea
  }
}

export const SET_RESULT_TAREAS = "SET_RESULT_TAREAS"

export function setResultTareas(tareas) {
  return {
    type: SET_RESULT_TAREAS,
    tareas
  } 
}

//actividad
export const SET_CURRENT_ACTIVIDAD = "SET_CURRRENT_ACTIVIDAD"

export function setCurrentActividad(actividad) {
  return {
    type: SET_CURRENT_ACTIVIDAD,
    actividad
  }
}

//tareaExtra
export const SET_TAREA_EXTRA = "SET_TAREA_EXTRA"

export function setTareaExtra(extra) {
  return {
    type: SET_TAREA_EXTRA,
    extra
  }
}

export const CLEAR_TAREA_EXTRA = "CLEAR_TAREA_EXTRA"

export function clearTareaExtra() {
  return {
    type: CLEAR_TAREA_EXTRA
  }
}

export const ADD_ELEMENT_TO_EXTRA = "ADD_ELEMENT_TO_EXTRA"

export function addElementToExtra(element) {
  return {
    type: ADD_ELEMENT_TO_EXTRA,
    element
  }
}

export const REMOVE_ELEMENT_FROM_EXTRA = "REMOVE_ELEMENT_FROM_EXTRA"

export function removeElementFromExtra(element) {
  return {
    type: REMOVE_ELEMENT_FROM_EXTRA,
    element
  }
}

export const ADD_VALID_ELEMENT_TO_EXTRA = "ADD_VALID_ELEMENT_TO_EXTRA"

export function addValidElementToExtra(element) {
  return {
    type: ADD_VALID_ELEMENT_TO_EXTRA,
    element
  }
}

export const REMOVE_VALID_ELEMENT_FROM_EXTRA = "REMOVE_VALID_ELEMENT_FROM_EXTRA"

export function removeValidElementFromExtra(element) {
  return {
    type: REMOVE_VALID_ELEMENT_FROM_EXTRA,
    element
  }
}

export const ADD_BYSCORE_CRITERION = "ADD_BYSCORE_CRITERION"

export function addByScoreCriterion(criterion) {
  return {
    type: ADD_BYSCORE_CRITERION,
    criterion
  }
}

export const REMOVE_BYSCORE_CRITERION = "REMOVE_BYSCORE_CRITERION"

export function removeByScoreCriterion(criterion) {
  return {
    type: REMOVE_BYSCORE_CRITERION,
    criterion
  }
}

export const ADD_SCORE_TO_CRITERION = "ADD_SCORE_TO_CRITERION"

export function addScoreToCriterion(score, criterionName) {
  return {
    type: ADD_SCORE_TO_CRITERION,
    score,
    criterionName
  }
}

export const REMOVE_SCORE_FROM_CRITERIA = "REMOVE_SCORE_FROM_CRITERIA"

export function removeScoreFromCriteria(code){
  return {
    type: REMOVE_SCORE_FROM_CRITERIA,
    code
  }
}

export const ADD_DEPOSIT_TO_ELEMENT = "ADD_DEPOSIT_TO_ELEMENT"

export function addDepositToElement(elementCode, depositCode) {
  return {
    type: ADD_DEPOSIT_TO_ELEMENT,
    elementCode,
    depositCode
  }
}

export const REMOVE_DEPOSIT_FROM_ELEMENT = "REMOVE_DEPOSIT_FROM_ELEMENT"

export function removeDepositFromElement(elementCode, depositCode) {
  return {
    type: REMOVE_DEPOSIT_FROM_ELEMENT,
    elementCode,
    depositCode
  }
}

export const API_USER_FOUND = "API_USER_FOUND"

export function apiUserFound(token) {
  return {
    type: API_USER_FOUND,
    token
  }
}

export const API_USER_EXPIRED = "API_USER_EXPIRED"

export function apiUserExpired() {
  return {
    type: API_USER_EXPIRED
  }
}

export const LOADING_API_USER = "LOADING_API_USER"

export function loadingApiUser() {
  return {
    type: LOADING_API_USER
  }
}