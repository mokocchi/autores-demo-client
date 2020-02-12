import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCurrentActividad } from './redux/actions'


import Graph from './Graph';

import { API_BASE_URL } from './config'
import ModalTarea from './ModalTarea';
import ModalConexion from './ModalConexion';
import { Link } from 'react-router-dom';
import tokenManager from './tokenManager';
import loggedIn from './loggedIn';

class FlujoTareas extends Component {

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
            errors: "",
            saveSuccess: false
        }
        this.setCurrentActividad(props.match.params.id);
        this.Graph = React.createRef();
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
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors
            });
            return;
        }
        this.props.dispatch(setCurrentActividad(data));
        const tareas = data.tareas.map((tarea, index) => {
            return {
                ...tarea,
                nombre: (index + 1) + ". " + tarea.nombre,
                id: tarea.id,
                graphId: index + 1,
                optional: false,
                initial: false,
                saltos: []
            }
        })
        this.setState({
            graphTareas: tareas,
            success: true
        });
    }

    onGuardarClick = () => {
        const actividadId = this.props.currentActividad.id;
        const tareas = this.state.graphTareas;
        const conexiones = this.state.graphConexiones;
        const graphNodes = {};
        tareas.forEach(tarea => { graphNodes[tarea.id] = [] });
        conexiones.forEach(conexion => {
            graphNodes[conexion.origen].push(conexion);
        })
        if (this.deleteJumps(actividadId)) {
            this.props.currentActividad.tareas.forEach(tarea => {
                const jumps = graphNodes[tarea.id];
                const conditionalJumps = jumps.filter(jump => jump.condicion);
                const jumpsByAnswer = {};
                conditionalJumps.forEach(jump => {
                    (jumpsByAnswer[jump.respuesta.id] = jumpsByAnswer[jump.respuesta.id] || []).push(jump)
                })
                console.log(jumpsByAnswer);
                Object.keys(jumpsByAnswer).forEach(key => {
                    const targetByCondition = {};
                    jumpsByAnswer[key].forEach(jump => {
                        (targetByCondition[jump.condicion.code] = targetByCondition[jump.condicion.code] || []).push(jump.destino)
                    })
                    Object.keys(targetByCondition).forEach(k => {
                        const salto = {
                            on: k,
                            answer: key,
                            to: targetByCondition[k],
                        }
                        if (!this.saveConditionalJump(tarea.id, salto, actividadId)) {
                            return;
                        }
                    })
                })
                const targets = jumps.filter(jump => jump.condicion === undefined).map(jump => jump.destino);
                if (conditionalJumps.length === 0 || targets.length > 0) {
                    if (!this.saveForcedJumps(tarea.id, targets, actividadId)) {
                        return;
                    }
                }
            })
            const opcionalIds = this.state.graphTareas.filter(tarea => tarea.optional).map(tarea => tarea.id);
            let inicialIds = this.state.graphTareas.filter(tarea => tarea.initial).map(tarea => tarea.id);
            const destinos = this.state.graphConexiones.map(conexion => conexion.destino);
            this.state.graphTareas.forEach(tarea => {
                if (!destinos.includes(tarea.id)) {
                    inicialIds = [...inicialIds.filter(id => id !== tarea.id), tarea.id]
                }
            })
            if (this.updatePlanificacionSettings(opcionalIds, inicialIds, actividadId)) {
                this.setState({
                    saveSuccess: true
                })
            }
        }
    }

    async deleteJumps(id) {
        const data = await tokenManager.deleteSaltosFromActividad(id);
        if (data.errors) {
            this.setState({
                saveSuccess: false,
                errors: data.errors
            });
            return false;
        } else {
            return true;
        }
    }

    async saveForcedJumps(tareaId, targets, id) {
        const data = await tokenManager.addSaltoToActividad({
            "origen": tareaId,
            "condicion": "ALL",
            "destinos": targets
        }, id);
        if (data.errors) {
            this.setState({
                saveSuccess: false,
                errors: data.errors
            });
            return false;
        } else {
            return true;
        }
    }

    async saveConditionalJump(tareaId, salto, id) {
        const data = await tokenManager.addSaltoToActividad({
            "origen": tareaId,
            "condicion": salto.on,
            "destinos": salto.to,
            "respuesta": salto.answer
        }, id);
        if (data.errors) {
            this.setState({
                saveSuccess: false,
                errors: data.errors
            });
            return false;
        } else {
            return true;
        }
    }

    async updatePlanificacionSettings(opcionales, iniciales, id) {
        const data = await tokenManager.setPlanificacionInActividad({
            "iniciales": iniciales,
            "opcionales": opcionales
        }, id);
        if (data.errors) {
            this.setState({
                saveSuccess: false,
                errors: data.errors
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
        this.setState({
            showConexion: true,
            selectedConexion: conexion
        })
    }

    handleCloseConexion = () => {
        this.setState({
            showConexion: false,
            selectedConexion: null
        })
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Planificación de tareas</h2>
                        <h6 style={{ color: 'gray' }}><i>
                            {this.state.graphConexiones.length === 0 ?
                                "Para iniciar la conexión entre tareas selecione una tarea incial"
                                : "Para conectar dos tareas seleccione una tarea"
                            }
                        </i></h6>
                    </Col>
                </Row>
                <Row style={{ border: "1px solid black", paddingTop: "2em", paddingBottom: "2em" }}>
                    <Col>
                        {this.state.success &&
                            <Graph ref={el => (this.Graph = el)} tareas={this.state.graphTareas}
                                conexiones={this.state.graphConexiones} actividadId={this.props.match.params.id}
                                onClickNode={this.handleShowTarea} onClickEdge={this.handleShowConexion} />
                        }
                        {this.state.success && !this.state.saveSuccess &&
                            <Button type="button" className="float-right" variant="info" onClick={this.onGuardarClick} >Guardar</Button>
                        }
                        {this.state.saveSuccess &&
                            <Link to="./mostrar">
                                <Button type="button" className="float-right" variant="info" onClick={this.props.outputJumps} >Continuar</Button>
                            </Link>
                        }
                        {this.state.selectedTarea &&
                            <ModalTarea key={this.state.selectedTarea.id} handleClose={this.handleCloseTarea}
                                show={this.state.showTarea} tarea={this.state.selectedTarea} tareas={this.state.graphTareas}
                                conexiones={this.state.graphConexiones} onUpdateTarea={this.onUpdateTarea} onAddConexion={this.onAddConexion}
                            />}
                        {this.state.selectedConexion &&
                            <ModalConexion key={this.state.selectedConexion.id} handleClose={this.handleCloseConexion}
                                show={this.state.showConexion} conexion={this.state.selectedConexion} tareas={this.state.graphTareas}
                                onRemoveConexion={this.onRemoveConexion} />
                        }
                    </Col>
                </Row>
            </Container>
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
export default loggedIn(connect(mapStateToProps)(FlujoTareas));