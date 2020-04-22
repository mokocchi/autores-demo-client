import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentActividad } from '../../redux/actions'


import tokenManager from '../../tokenManager';
import md5 from 'md5';
import { CONDITIONS_ARRAY } from '../../config';
import PlanificacionEdit from './Edit';

class PlanificacionEditContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            graphTareas: [],
            graphConexiones: [],
            showTarea: false,
            showConexion: false,
            selectedTarea: null,
            selectedConexion: null,
            selectedOpciones: [],
            errors: "",
            saveSuccess: false
        }
        this.Graph = React.createRef();
    }

    componentDidMount() {
        this.setCurrentActividad(this.props.actividadId);
    }

    onUpdateTarea = (tarea) => {
        this.setState({
            graphTareas: [...this.state.graphTareas.map(t => t.id === tarea.id ? tarea : t)]
        })
    }

    onAddConexion = (newConexion) => {
        this.setState({
            graphConexiones: [...this.state.graphConexiones.filter(conexion => conexion.id !== newConexion.id), newConexion]
        })
    }

    onResetSaltos = (tareaId) => {
        const newSaltos = this.state.graphConexiones.filter(
            conexion =>
                conexion.origen !== tareaId &&
                conexion.destino !== tareaId)
        this.setState({
            graphConexiones: [...newSaltos]
        })
    }

    onRemoveConexion = (conexion) => {
        const conexiones = this.state.graphConexiones;
        const newConexiones = conexiones.filter(con => con.id !== conexion.id);
        this.setState({
            graphConexiones: [...newConexiones]
        })
    }

    async setCurrentActividad(id) {
        const data = await tokenManager.getActividad(id);
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message
            });
            return;
        }
        this.props.dispatch(setCurrentActividad(data));
        const dataTareas = await tokenManager.getTareasForActividad(id);
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message
            });
            return;
        }
        const conexiones = [];
        const planificacion = await tokenManager.getPlanificacionForActividad(id);

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
                        const tareaNombre = dataTareas.results.find(item => item.codigo === salto.respuesta).nombre
                        conexion.respuesta = {
                            id: salto.respuesta,
                            name: tareaNombre
                        };
                    } else {
                        const opcion = dataTareas.results.find(item => item.id === salto.origen_id).extra.elements.find(item => item.code === salto.respuesta);
                        let respuestaNombre = "";
                        if (opcion) {
                            respuestaNombre = opcion.name;
                        } else {
                            respuestaNombre = null;
                            conexion.crossed = true;
                        }
                        conexion.respuesta = {
                            id: salto.respuesta,
                            name: respuestaNombre
                        };
                    }
                }
                conexiones.push(conexion);
            })
        });

        const tareas = dataTareas.results.map((tarea, index) => {
            return {
                ...tarea,
                nombre: (index + 1) + ". " + tarea.nombre,
                id: tarea.id,
                graphId: index + 1,
                optional: planificacion.opcionales_ids.find(o => o === tarea.id) || false,
                initial: planificacion.iniciales_ids.find(i => i === tarea.id) || false
            }
        })
        this.setState({
            graphTareas: tareas,
            graphConexiones: conexiones,
            success: true
        });
    }

    createJumps(tarea, graphNodes) {
        const saltos = [];
        const jumps = graphNodes[tarea.id];
        const conditionalJumps = jumps.filter(jump => jump.condicion);
        console.log(conditionalJumps);
        const jumpsByAnswer = {};
        conditionalJumps.forEach(jump => {
            (jumpsByAnswer[jump.respuesta.id] = jumpsByAnswer[jump.respuesta.id] || []).push(jump)
        })
        Object.keys(jumpsByAnswer).forEach(key => {
            const targetByCondition = {};
            jumpsByAnswer[key].forEach(jump => {
                (targetByCondition[jump.condicion.code] = targetByCondition[jump.condicion.code] || []).push(jump.destino)
            })
            Object.keys(targetByCondition).forEach(k => {
                console.log("salto condicional");
                saltos.push({
                    "origen": tarea.id,
                    "condicion": k,
                    "destinos": targetByCondition[k],
                    "respuesta": key
                });
            })
        })
        const targets = jumps.filter(jump => jump.condicion === undefined).map(jump => jump.destino);
        //conditionalJumps.length === 0 && 

        console.log(targets);
        if (targets.length > 0) {
            console.log("salto forzado");
            saltos.push({
                "origen": tarea.id,
                "condicion": "ALL",
                "destinos": targets
            });
        }
        return saltos;
    }

    onGuardarClick = () => {
        const actividadId = this.props.currentActividad.id;
        const tareas = this.state.graphTareas;
        const conexiones = this.state.graphConexiones;
        if(conexiones.find(c => c.crossed)) {
            this.setState({
                errors: "Falta corregir opciones"
            })
            return
        }
        const graphNodes = {};
        tareas.forEach(tarea => { graphNodes[tarea.id] = [] });
        conexiones.forEach(conexion => {
            graphNodes[conexion.origen].push(conexion);
        })
        let saltos = [];
        tareas.forEach(tarea => saltos = saltos.concat(this.createJumps(tarea, graphNodes)));
        const opcionalIds = this.state.graphTareas.filter(tarea => tarea.optional).map(tarea => tarea.id);
        let inicialIds = this.state.graphTareas.filter(tarea => tarea.initial).map(tarea => tarea.id);
        const destinos = this.state.graphConexiones.map(conexion => conexion.destino);
        this.state.graphTareas.forEach(tarea => {
            if (!destinos.includes(tarea.id)) {
                inicialIds = [...inicialIds.filter(id => id !== tarea.id), tarea.id]
            }
        })
        if (this.setPlanificacion(opcionalIds, inicialIds, saltos, actividadId)) {
            this.setState({
                saveSuccess: true
            })
        }
    }

    async setPlanificacion(opcionales, iniciales, saltos, id) {
        const data = await tokenManager.setPlanificacionInActividad({
            "saltos": saltos,
            "iniciales": iniciales,
            "opcionales": opcionales
        }, id);
        if (data.error_code) {
            this.setState({
                saveSuccess: false,
                errors: data.user_message
            })
            return false;
        } else {
            return true;
        }
    }


    handleShowTarea = (tareaId) => {
        const tarea = this.state.graphTareas.find(tarea => tarea.id === tareaId);
        this.setState({
            showTarea: true,
            selectedTarea: tarea
        })
    }

    handleCloseTarea = () => {
        this.setState({
            showTarea: false,
            selectedTarea: null
        })
    }

    handleShowConexion = (conexionId) => {
        const conexion = this.state.graphConexiones.find(conexion => conexion.id === conexionId);
        const tarea = this.state.graphTareas.find(t => t.id === conexion.origen);
        this.setState({
            showConexion: true,
            selectedConexion: conexion,
            selectedOpciones: tarea.extra ? tarea.extra.elements : []
        })
    }

    handleCloseConexion = () => {
        this.setState({
            showConexion: false,
            selectedConexion: null
        })
    }

    setOpcion = (code, nombre) => {
        const conexiones = this.state.graphConexiones.map(conexion => {
            if (conexion.id !== this.state.selectedConexion.id) {
                return conexion
            } else {
                return {
                    ...conexion,
                    respuesta: {
                        id: code,
                        name: nombre
                    },
                    crossed: false
                }
            }
        })
        this.setState({
            graphConexiones: [...conexiones]
        })
        this.handleCloseConexion();
    }

    render() {
        return (
            <PlanificacionEdit graphConexiones={this.state.graphConexiones} tareas={this.state.graphTareas}
                conexiones={this.state.graphConexiones} actividadId={this.props.actividadId} clone={this.props.clone}

                selectedTarea={this.state.selectedTarea} handleCloseTarea={this.handleCloseTarea}
                showTarea={this.state.showTarea} onShowTarea={this.handleShowTarea}
                onClickNode={this.handleShowTarea} onClickEdge={this.handleShowConexion}
                onUpdateTarea={this.onUpdateTarea} onAddConexion={this.onAddConexion}

                selectedConexion={this.state.selectedConexion} handleCloseConexion={this.handleCloseConexion}
                showConexion={this.state.showConexion} onShowConexion={this.handleShowConexion} onRemoveConexion={this.onRemoveConexion}
                success={this.state.success} saveSuccess={this.state.saveSuccess} setOpcion={this.setOpcion}
                onGuardarClick={this.onGuardarClick} selectedOpciones={this.state.selectedOpciones} errors={this.state.errors}
            />
        )
    }
}

function mapStateToProps(state) {
    const { currentActividad } = state.actividad;
    const { chosenTareas } = state.actividadTareas;
    return {
        currentActividad,
        chosenTareas
    }
}
export default connect(mapStateToProps)(PlanificacionEditContainer);