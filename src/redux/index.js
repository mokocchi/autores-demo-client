import { combineReducers } from 'redux';

import optionsByAttribute from './reducers/optionsByAttribute';
import actividadTareas from './reducers/actividadTareas';
import actividad from './reducers/actividad';
import tarea from './reducers/tarea';

export default combineReducers({
    optionsByAttribute,
    actividadTareas,
    actividad,
    tarea
})