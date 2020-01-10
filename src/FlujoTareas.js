import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCurrentActividad } from './redux/actions'


import Graph from './Graph';

import { API_BASE_URL } from './config'
import ModalTarea from './ModalTarea';

class FlujoTareas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            graphTareas: [],
            graphConexiones: [],
            show: false,
            selectedTarea: null
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

    onRemoveSalto = (conexion) => {
        const saltos = this.state.graphConexiones;
        const newSaltos = saltos.filter(sal => sal.id !== conexion.id);
        this.setState({
            graphConexiones: [...newSaltos]
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
                nombre: (index + 1) + ": " + tarea.nombre,
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

    handleShow = (tareaId) => {
        const tarea = this.state.graphTareas.find(tarea => tarea.id === tareaId);
        this.setState({
            show: true,
            selectedTarea: tarea
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Planificación de tareas</h2>
                    </Col>
                </Row>
                <Row style={{ border: "1px solid black", paddingTop: "2em", paddingBottom: "2em" }}>
                    <Col>
                        {this.state.success && <Graph ref={el => (this.Graph = el)} tareas={this.state.graphTareas}
                            conexiones={this.state.graphConexiones} actividadId={this.props.match.params.id} onClickNode={this.handleShow} />}
                        {this.state.selectedTarea &&
                            <ModalTarea key={this.state.selectedTarea.id} handleClose={this.handleClose} handleShow={this.handleShow}
                                show={this.state.show} tarea={this.state.selectedTarea} tareas={this.state.graphTareas}
                                onUpdateTarea={this.onUpdateTarea} onAddConexion={this.onAddConexion}
                            />}
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