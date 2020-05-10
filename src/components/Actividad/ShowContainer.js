import React, { Component } from 'react';

import tokenManager from '../../tokenManager';
import ActividadShow from './Show';
import md5 from 'md5';
import { CONDITIONS_ARRAY } from '../../config';
import { connect } from 'react-redux';

class ActividadShowContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividad: null,
            tareas: [],
            errors: false,
            showModalPublicar: true,
            modalPublicarLoading: false
        }
        this.getActividadAndTareas = this.getActividadAndTareas.bind(this);
    }

    componentDidMount() {
        if (!this.state.actividad && !this.props.userLoading) {
            this.getActividadAndTareas();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userLoading && !this.props.userLoading && !this.state.actividad) {
            this.getActividadAndTareas();
        }
    }

    async getActividadAndTareas() {
        let data = {};
        if (this.props.user.gid) {
            data = await tokenManager.getActividad(this.props.actividadId);
        } else {
            data = await tokenManager.getActividadPublic(this.props.actividadId);
        }
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

        let tareasData;
        if (this.props.user.gid) {
            tareasData = await tokenManager.getTareasForActividad(data.id);
        } else {
            tareasData = await tokenManager.getTareasForActividadPublic(data.id);
        }
        if (tareasData.error_code) {
            this.setState({
                errors: true
            })
            return
        }

        const conexiones = [];
        let planificacion;
        if (this.props.user.gid) {
            planificacion = await tokenManager.getPlanificacionForActividad(data.id);
        } else {
            planificacion = await tokenManager.getPlanificacionForActividadPublic(data.id);
        }
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
                        const tareaNombre = tareasData.results.find(item => item.codigo === salto.respuesta).nombre
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

    onClickPublicar = () => {
        this.setState({
            showModalPublicar: true
        })
    }

    onClickCerrar = () => {
        this.setState({
            showModalCerrar: true
        })
    }

    onHidePublicar = () => {
        this.setState({
            showModalPublicar: false
        })
    }

    onHideCerrar = () => {
        this.setState({
            showModalCerrar: false
        })
    }

    async publishActividad(id) {
        this.setState({
            modalPublicarLoading: true
        })
        const data = await tokenManager.publishActividad({ actividad: id });
        if (data.error_code) {
            this.setState({
                modalPublicarLoading: false
            })
            return;
        }
        const actividad = {
            ...this.state.actividad,
            definitiva: true
        }
        this.setState({
            showModalPublicar: false,
            actividad: actividad,
            modalPublicarLoading: false
        })
    }

    async closeActividad(id) {
        this.setState({
            modalCerrarLoading: true
        })
        const data = await tokenManager.closeActividad({ actividad: id });
        if (data.error_code) {
            this.setState({
                modalCerrarLoading: false
            })
            return;
        }
        const actividad = {
            ...this.state.actividad,
            cerrada: true
        }
        this.setState({
            showModalCerrar: false,
            actividad: actividad,
            modalCerrarLoading: false
        })
    }

    onClickInModalPublicar = () => {
        this.publishActividad(this.props.actividadId);
    }

    onClickInModalCerrar = () => {
        this.closeActividad(this.props.actividadId);
    }

    render() {
        const { actividad, tareas, conexiones, errors } = this.state;
        return actividad && !this.props.userLoading && <ActividadShow actividad={actividad} tareas={tareas} errors={errors} conexiones={conexiones}
            propia={actividad.autor && this.props.user.gid && (this.props.user.gid === actividad.autor.googleid)}
            onClickPublicar={this.onClickPublicar} showModalPublicar={this.state.showModalPublicar} onHidePublicar={this.onHidePublicar}
            onClickInModalPublicar={this.onClickInModalPublicar} modalPublicarLoading={this.state.modalPublicarLoading}
            onClickCerrar={this.onClickCerrar} showModalCerrar={this.state.showModalCerrar} onHideCerrar={this.onHideCerrar}
            onClickInModalCerrar={this.onClickInModalCerrar} modalCerrarLoading={this.state.modalCerrarLoading}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps)(ActividadShowContainer);