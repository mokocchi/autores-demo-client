import { CHOOSE_TAREA, SELECT_TAREA, UNCHOOSE_TAREA, ADD_TAREA } from '../actions'

export default function actividadTareas(
    state = {
        criteria: {
            autor: '',
            nombre: '',
            dominio: '',
        },
        tareasResult: [
            { "nombre": "Tarea1 es muy larga y vamos a ver que pasa con el select", "id": "1" },
            { "nombre": "Tarea2", "id": "2" }
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
            return {
                ...state,
                chosenTareas: [...state.chosenTareas, action.tarea]
            }
        default:
            return state;
    }
}