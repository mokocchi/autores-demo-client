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
            showModalCerrar: false,
            showModalReabrir: false,
            showModalHacerPublica: false,
            showModalHacerPrivada: false,
            modalPublicarLoading: false,
            modalCerrarLoading: false,
            modalReabrirLoading: false,
            modalHacerPublicaLoading: false,
            modalHacerPrivadaLoading: false
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
                        switch (salto.condicion) {
                            case "CORRECT":
                                conexion.respuesta = {
                                    id: salto.respuesta,
                                    name: "todos"
                                }
                                break;
                            case "INCORRECT":
                                conexion.respuesta = {
                                    id: salto.respuesta,
                                    name: "no todos"
                                }
                                break;
                            case "YES_TASK":
                            case "NO_TASK":
                                const tareaNombre = tareasData.results.find(item => item.codigo === salto.respuesta).nombre
                                conexion.respuesta = {
                                    id: salto.respuesta,
                                    name: tareaNombre
                                };
                                break;
                            default:
                                break;
                        }
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

    onClickPublicar = () => this.setState({ showModalPublicar: true })

    onClickCerrar = () => this.setState({ showModalCerrar: true })

    onClickReabrir = () => this.setState({ showModalReabrir: true })

    onClickHacerPublica = () => this.setState({ showModalHacerPublica: true })

    onClickHacerPrivada = () => this.setState({ showModalHacerPrivada: true })

    onHidePublicar = () => this.setState({ showModalPublicar: false })

    onHideCerrar = () => this.setState({ showModalCerrar: false })

    onHideReabrir = () => this.setState({ showModalReabrir: false })

    onHideHacerPublica = () => this.setState({ showModalHacerPublica: false })

    onHideHacerPrivada = () => this.setState({ showModalHacerPrivada: false })

    async publishActividad(id) {
        this.setState({
            modalPublicarLoading: true
        })
        const data = await tokenManager.publishActividad(id);
        if (data.error_code) {
            this.setState({
                modalPublicarLoading: false
            })
            return;
        }
        this.setState({
            showModalPublicar: false,
            actividad: data,
            modalPublicarLoading: false
        })
    }

    async closeActividad(id) {
        this.setState({
            modalCerrarLoading: true
        })
        const data = await tokenManager.closeActividad(id);
        if (data.error_code) {
            this.setState({
                modalCerrarLoading: false
            })
            return;
        }
        this.setState({
            showModalCerrar: false,
            actividad: data,
            modalCerrarLoading: false
        })
    }

    async reopenActividad(id) {
        this.setState({
            modalReabrirLoading: true
        })
        const data = await tokenManager.reopenActividad(id);
        if (data.error_code) {
            this.setState({
                modalReabrirLoading: false
            })
            return;
        }
        this.setState({
            showModalReabrir: false,
            actividad: data,
            modalHacerPublicaLoading: false
        })
    }

    makeActividadPublic = async (id) => {
        this.setState({
            modalHacerPublicaLoading: true
        })
        const data = await tokenManager.makeActividadPublic(id);
        if (data.error_code) {
            this.setState({
                modalHacerPublicaLoading: false
            })
            return;
        }
        this.setState({
            showModalHacerPublica: false,
            actividad: data,
            modalHacerPublicaLoading: false
        })
    }

    makeActividadPrivate = async (id) => {
        this.setState({
            modalHacerPrivadaLoading: true
        })
        const data = await tokenManager.makeActividadPrivate(id);
        if (data.error_code) {
            this.setState({
                modalHacerPrivadaLoading: false
            })
            return;
        }
        this.setState({
            showModalHacerPrivada: false,
            actividad: data,
            modalHacerPrivadaLoading: false
        })
    }

    onClickInModalPublicar = () => {
        this.publishActividad(this.props.actividadId);
    }

    onClickInModalCerrar = () => {
        this.closeActividad(this.props.actividadId);
    }

    onClickInModalReabrir = () => {
        this.reopenActividad(this.props.actividadId);
    }

    onClickInModalHacerPublica = () => {
        this.makeActividadPublic(this.props.actividadId);
    }

    onClickInModalHacerPrivada = () => {
        this.makeActividadPrivate(this.props.actividadId)
    }

    render() {
        const { actividad, tareas, conexiones, errors } = this.state;
        return actividad && !this.props.userLoading && <ActividadShow actividad={actividad} tareas={tareas} errors={errors} conexiones={conexiones}
            propia={actividad.autor && this.props.user.gid && (this.props.user.gid === actividad.autor.googleid)}
            onClickPublicar={this.onClickPublicar} showModalPublicar={this.state.showModalPublicar} onHidePublicar={this.onHidePublicar}
            onClickInModalPublicar={this.onClickInModalPublicar} modalPublicarLoading={this.state.modalPublicarLoading}
            onClickCerrar={this.onClickCerrar} showModalCerrar={this.state.showModalCerrar} onHideCerrar={this.onHideCerrar}
            onClickInModalCerrar={this.onClickInModalCerrar} modalCerrarLoading={this.state.modalCerrarLoading}
            onClickReabir={this.onClickReabrir} showModalReabrir={this.state.showModalReabrir} onHideReabrir={this.onHideReabrir}
            onClickInModalReabrir={this.onClickInModalReabrir} modalReabrirLoading={this.state.modalReabrirLoading}
            onClickHacerPublica={this.onClickHacerPublica} showModalHacerPublica={this.state.showModalHacerPublica} onHideHacerPublica={this.onHideHacerPublica}
            onClickInModalHacerPublica={this.onClickInModalHacerPublica} modalHacerPublicaLoading={this.state.modalHacerPublicaLoading}
            onClickHacerPrivada={this.onClickHacerPrivada} showModalHacerPrivada={this.state.showModalHacerPrivada} onHideHacerPrivada={this.onHideHacerPrivada}
            onClickInModalHacerPrivada={this.onClickInModalHacerPrivada} modalHacerPrivadaLoading={this.state.modalHacerPrivadaLoading}
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