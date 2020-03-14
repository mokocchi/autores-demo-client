import React, { Component } from 'react';

import Graph from '../../Planificacion/Graph';
import tokenManager from '../../../tokenManager';
import { CONDITIONS_ARRAY } from '../../../config';
import md5 from 'md5';

class GraphContainer extends Component {
    constructor() {
        super();
        this.state = {
            tareas: [],
            conexiones: [],
        };
        this.loadTareas = this.loadTareas.bind(this);
    }
    componentDidMount() {
        this.loadTareas();
    }

    async loadTareas() {
        const tareasData = await tokenManager.getTareasForActividad(this.props.actividadId);
        if(tareasData.error_code) {
            //set error message
            return;
        }
        const conexiones = [];
        const planificacion = await tokenManager.getPlanificacionForActividad(this.props.actividadId);
        if (planificacion.error_code) {
            this.setState({
                errors: true,
                errorMessage: planificacion.user_message
            })
            return
        }

        planificacion.saltos.forEach(salto => {
            const origen = salto.origen_id;
            const destinos = salto.destino_ids;
            destinos.forEach(destino => {
                const conexion = {
                    origen,
                    destino,
                    id: md5(origen + "_" + destino + (salto.condicion ? "_" + salto.condicion + "_" + salto.respuesta : ""))
                }
                if (salto.respuesta) {
                    const condicionName = CONDITIONS_ARRAY.find(item => item.code === salto.condicion).name;
                    conexion.condicion = {
                        code: salto.condicion,
                        name: condicionName
                    };
                    if (!["YES", "NO"].includes(salto.condicion)) {
                        const tareaNombre = tareasData.results.find(item => item.id === salto.respuesta).nombre
                        conexion.respuesta = {
                            id: salto.respuesta,
                            name: tareaNombre
                        };
                    } else {
                        const respuestaNombre = tareasData.results.find(item => item.id === salto.origen_id).extra.elements.find(item => item.code === salto.respuesta).name;
                        conexion.respuesta = {
                            id: salto.respuesta,
                            name: respuestaNombre
                        };
                    }
                }
                conexiones.push(conexion);
            })
        })
        
        this.setState({
            conexiones: conexiones,
            tareas: tareasData.results.map((tarea, index) => {
                return {
                    ...tarea,
                    nombre: (index + 1) + ". " + tarea.nombre,
                    graphId: index + 1,
                    optional: planificacion.opcionales_ids.find(o => o === tarea.id),
                    initial: planificacion.iniciales_ids.find(i => i === tarea.id)
                }
            })
        })
    }

    render() {
        const {tareas, conexiones} = this.state
        return (
            conexiones && <Graph dataCy={"graphShow"} tareas={tareas} conexiones={conexiones} onClickNode={() => {}}/>
        )
    }
}

export default GraphContainer