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

export const ADD_OPTION = 'ADD_OPTION'

export function addOption(attribute, option) {
  return {
    type: ADD_OPTION,
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

//actividad
export const SET_CURRENT_ACTIVIDAD = "SET_CURRRENT_ACTIVIDAD"

export function setCurrentActividad(actividad) {
  return {
    type: SET_CURRENT_ACTIVIDAD,
    actividad
  }
}