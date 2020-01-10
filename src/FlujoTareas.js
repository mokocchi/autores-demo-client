import React, { Component } from 'react';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCurrentActividad, addTarea } from './redux/actions'


import Graph from './Graph';

import { API_BASE_URL } from './config'
import FlujoTareasPanel from './FlujoTareasPanel';

class FlujoTareas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            graphTareas: [],
            graphSaltos: []
        }
        this.setCurrentActividad(props.match.params.id);
        if (props.tareas == null) {
            this.loadTareasForActividad(props.match.params.id);
        }
        this.Graph = React.createRef();
    }

    onAddTarea = (newTarea) => {
        this.setState({
            graphTareas: [...this.state.graphTareas.filter(tarea => tarea.id !== newTarea.id), newTarea]
        })
    }
    
    onUpdateTarea = (tarea) => {
        this.setState({
            graphTareas: [...this.state.graphTareas.map(t => t.id === tarea.id ? tarea : t)]
        })
    }

    onAddSalto = (newSalto) => {
        this.setState({
            graphSaltos: [...this.state.graphSaltos.filter(salto => salto.id != newSalto.id), newSalto]
        })
    }

    onResetSaltos = (tareaId) => {
        const newSaltos = this.state.graphSaltos.filter(
            salto =>
                salto.idOrigen !== tareaId &&
                salto.destino !== tareaId)
        this.setState({
            graphSaltos: [...newSaltos]
        })
    }

    onRemoveSalto = (salto) => {
        const saltos = this.state.graphSaltos;
        const newSaltos = saltos.filter(sal => sal.id !== salto.id);
        this.setState({
            graphSaltos: [...newSaltos]
        })
    }

    onRemoveTarea = (oldTarea) => {
        this.setState({
            graphTareas: [...this.state.graphTareas.filter(tarea => tarea.id !== oldTarea.id)]
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
        data.forEach(tarea => this.props.dispatch(addTarea(tarea)));
        this.setState({ success: true });
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

    render() {
        const { chosenTareas } = this.props;
        const tareasList = chosenTareas.map((tarea, index) => {
            return {
                ...tarea,
                nombre: (index + 1) + ": " + tarea.nombre,
                id: tarea.id,
                graphId: index + 1
            }
        });
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Planificación de tareas</h2>
                    </Col>
                </Row>
                <Row style={{ border: "1px solid black", paddingTop: "2em", paddingBottom: "2em" }}>
                    <Col md={4}>
                        <div style={{ height: '500px', overflowY: 'scroll' }}>
                            {this.state.success && <FlujoTareasPanel tareasList={tareasList} onAddTarea={this.onAddTarea}
                                onRemoveTarea={this.onRemoveTarea} onAddSalto={this.onAddSalto} onResetSaltos={this.onResetSaltos}
                                onRemoveSalto={this.onRemoveSalto} onUpdateTarea={this.onUpdateTarea} />}
                        </div>
                    </Col>
                    <Col>
                        {this.state.success && <Graph ref={el => (this.Graph = el)} tareas={this.state.graphTareas}
                            saltos={this.state.graphSaltos} actividadId={this.props.match.params.id} />}
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