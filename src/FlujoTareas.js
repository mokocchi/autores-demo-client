import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCurrentActividad } from './redux/actions'


import Graph from './Graph';

import { API_BASE_URL } from './config'
import ModalTarea from './ModalTarea';
import ModalConexion from './ModalConexion';

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
            selectedConexion: null
        }
        this.setCurrentActividad(props.match.params.id);
        this.loadTareasForActividad(props.match.params.id);
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

    async loadTareasForActividad(id) {
        const response = await fetch(API_BASE_URL + '/actividades/' + id + '/tareas');
        const data = await response.json();
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors
            })
            return;
        }
        const tareas = data.map((tarea, index) => {
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

    async setCurrentActividad(id) {
        const response = await fetch(API_BASE_URL + '/actividades/' + id);
        const data = await response.json();
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors
            });
            return;
        }
        this.props.dispatch(setCurrentActividad(data));
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
                        {this.state.success && <Graph ref={el => (this.Graph = el)} tareas={this.state.graphTareas}
                            conexiones={this.state.graphConexiones} actividadId={this.props.match.params.id}
                            onClickNode={this.handleShowTarea} onClickEdge={this.handleShowConexion} />}
                        {this.state.selectedTarea &&
                            <ModalTarea key={this.state.selectedTarea.id} handleClose={this.handleCloseTarea}
                                show={this.state.showTarea} tarea={this.state.selectedTarea} tareas={this.state.graphTareas}
                                onUpdateTarea={this.onUpdateTarea} onAddConexion={this.onAddConexion}
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
export default connect(mapStateToProps)(FlujoTareas);