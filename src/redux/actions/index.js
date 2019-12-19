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