import { combineReducers } from 'redux';

import optionsByAttribute from './reducers/optionsByAttribute';
import actividadTareas from './reducers/actividadTareas'
import actividad from './reducers/actividad'

export default combineReducers({
    optionsByAttribute,
    actividadTareas,
    actividad
})