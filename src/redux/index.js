import { combineReducers } from 'redux';

import optionsByAttribute from './reducers/optionsByAttribute';
import actividadTareas from './reducers/actividadTareas'

export default combineReducers({
    optionsByAttribute,
    actividadTareas
})