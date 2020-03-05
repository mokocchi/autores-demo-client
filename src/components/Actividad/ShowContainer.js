import React, { Component } from 'react';

import tokenManager from '../../tokenManager';
import ActividadShow from './Show';
import md5 from 'md5';
import { CONDITIONS_ARRAY } from '../../config';

class ActividadShowContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividad: null,
            tareas: [],
            errors: false
        }
        this.getActividadAndTareas = this.getActividadAndTareas.bind(this);
    }

    componentDidMount() {
        this.getActividadAndTareas();
    }

    async getActividadAndTareas() {
        const data = await tokenManager.getActividadPublic(this.props.actividadId)
        if (!data.error_code) {
            this.setState({
                actividad: data
            })
        } else {
            this.setState({
                errors: true
            })
            return;
        }

        const tareasData = await tokenManager.getTareasForActividadPublic(data.id);
        if (tareasData.error_code) {
            this.setState({
                errors: true
            })
            return
        }

        const conexiones = [];
        const planificacion = await tokenManager.getPlanificacionForActividadPublic(data.id);
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
        const { actividad, tareas, conexiones, errors } = this.state;
        return <ActividadShow actividad={actividad} tareas={tareas} errors={errors} conexiones={conexiones} />
    }
}

export default ActividadShowContainer;