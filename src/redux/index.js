import { combineReducers } from 'redux';

import { reducer as oidc } from 'redux-oidc';
import optionsByAttribute from './reducers/optionsByAttribute';
import actividadTareas from './reducers/actividadTareas';
import actividad from './reducers/actividad';
import tareaExtra from './reducers/tareaExtra';

export default combineReducers({
    oidc,
    optionsByAttribute,
    actividadTareas,
    actividad,
    tareaExtra
})