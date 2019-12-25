import {
    CHOOSE_TAREA, SELECT_TAREA, UNCHOOSE_TAREA,
    ADD_TAREA, SET_RESULT_TAREAS
} from '../actions'

export default function actividadTareas(
    state = {
        criteria: {
            autor: '',
            nombre: '',
            dominio: '',
        },
        tareasResult: [
        ],
        selectedTareaId: "",
        chosenTareas: []
    }, action
) {
    switch (action.type) {
        case SELECT_TAREA:
            return {
                ...state,
                selectedTareaId: action.id
            }
        case CHOOSE_TAREA:
            let index = state.chosenTareas.findIndex(tarea => tarea.id === state.selectedTareaId);

            if (index !== -1)
                return state;

            const tarea = state.tareasResult.find((tarea) => tarea.id === state.selectedTareaId);
            return {
                ...state,
                chosenTareas: [...state.chosenTareas, tarea]
            }
        case UNCHOOSE_TAREA:
            return {
                ...state,
                chosenTareas: state.chosenTareas.filter((tarea) => tarea.id !== action.id)
            }
        case ADD_TAREA:
            const tareaIndex = state.chosenTareas.findIndex(tarea => tarea.name === action.tarea.name)
            if(tareaIndex !== -1){
                return state;
            }
            return {
                ...state,
                chosenTareas: [...state.chosenTareas, action.tarea]
            }
        case SET_RESULT_TAREAS:
            return {
                ...state,
                resultTareas: action.tareas
            }
        default:
            return state;
    }
}