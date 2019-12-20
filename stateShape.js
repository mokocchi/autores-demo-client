export const state = {
  optionsByAttribute: {
    dominios: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Matemática'
        },
        {
          id: 500,
          title: 'Arte'
        }
      ]
    }
  },
  actividadTareas: {
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
  }
}