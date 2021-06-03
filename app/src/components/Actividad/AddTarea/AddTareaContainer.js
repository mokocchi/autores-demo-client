import React, { Component } from 'react';
import { connect } from 'react-redux';
import TareaSearchContainer from './SearchContainer';
import AddTareasSelectTareaContainer from './SelectTareaContainer';
import PendingTareasListContainer from './PendingTareasListContainer';
import AddTareasActionListContainer from './TareasActionListContainer';
import ActividadAddTareasButtonContainer from './ButtonContainer';
import GraphContainer from './GraphContainer';
import tokenManager from '../../../tokenManager';
import LoadSpinner from '../../UI/LoadSpinner';
import Icon from 'react-web-vector-icons';
import { Alert, Row, Col } from 'react-bootstrap';
import { addTarea } from '../../../redux/actions';

class AddTareaContainer extends Component {
    constructor() {
        super();
        this.state = {
            actividad: null,
            clonedTareas: [],
            referencedTareas: [],
            clonedPlanificacion: null,
            isLoading: true,
            errorMessage: ""
        }
        this.getActividad = this.getActividad.bind(this);
        this.getClonedTareas = this.getClonedTareas.bind(this);
        this.getClonedPlanificacion = this.getClonedPlanificacion.bind(this);
        this.load = this.load.bind(this);
    }

    async getActividad() {
        const actividad = await tokenManager.getActividad(this.props.actividadId);
        if (actividad.error_code) {
            this.setState({ isLoading: false, errorMessage: actividad.user_message })
            return;
        }
        this.setState({
            actividad: actividad,
        });
    }

    async getTareas() {
        const tareas = await tokenManager.getTareasForActividad(this.props.actividadId);
        if (tareas.error_code) {
            this.setState({ isLoading: false, errorMessage: tareas.user_message })
            return;
        }
        tareas.results.forEach(tarea => {
            this.props.dispatch(addTarea(tarea))
        });
    }

    async getClonedTareas() {
        const clonedTareas = await tokenManager.getTareasForActividad(this.props.clone);
        if (clonedTareas.error_code) {
            this.setState({ isLoading: false, errorMessage: clonedTareas.user_message })
            return;
        }
        this.setState({
            clonedTareas: clonedTareas.results
        });
    }

    async getClonedPlanificacion() {
        const clonedPlanificacion = await tokenManager.getPlanificacionForActividad(this.props.clone);
        if (clonedPlanificacion.error_code) {
            this.setState({ isLoading: false, errorMessage: clonedPlanificacion.user_message })
            return;
        }

        const referencedTareas = [];
        clonedPlanificacion.saltos.forEach(salto => {
            if (["YES", "NO"].includes(salto.condicion)) {
                referencedTareas.push(salto.origen_id);
            }
        });

        this.setState({
            referencedTareas: referencedTareas,
            clonedPlanificacion: clonedPlanificacion
        });
    }

    async load() {
        await this.getActividad();
        await this.getTareas();
        if (this.props.clone) {
            await this.getClonedTareas();
            await this.getClonedPlanificacion();
        }
        this.setState({
            isLoading: false
        })
    }

    componentDidMount() {
        this.load()
    }

    remainingTareas = () => {
        return this.state.clonedTareas.filter((item, index) => {
            return index >= this.props.chosenTareas.length
        }
        )
    }

    render() {
        return (
            this.state.isLoading ?
                <LoadSpinner /> :
                this.state.errorMessage ?
                    <legend>{this.state.errorMessage}</legend> :
                    <>
                        {this.props.clone &&
                            <Alert variant="info">
                                <Icon name="md-information-circle-outline" font="Ionicons" color="black" size={"1rem"} />
                                <span> Para reemplazar la próxima tarea, buscá una en Buscar en Mis Tareas o creá una nueva</span>
                            </Alert>}
                        <div style={{ position: "relative" }}>
                            {this.props.clone &&
                                <GraphContainer actividadId={this.props.clone} selected={this.remainingTareas().length > 0 ? this.remainingTareas()[0].id : null} />
                            }
                        </div>
                        <br />
                        <Row>
                            <Col>
                                <AddTareasActionListContainer
                                    clone={this.props.clone}
                                    clonedTareas={this.state.clonedTareas}
                                    remainingTareas={this.remainingTareas()}
                                />
                                <br />
                                {this.props.clone &&
                                    <PendingTareasListContainer
                                        remainingTareas={this.remainingTareas()}
                                        referencedTareas={this.state.referencedTareas}
                                    />
                                }
                                {this.state.actividad && <ActividadAddTareasButtonContainer actividadId={this.state.actividad.id} clone={this.props.clone}
                                    disabled={this.remainingTareas().length > 0}
                                    clonedPlanificacion={this.state.clonedPlanificacion} clonedTareas={this.state.clonedTareas} />}
                            </Col>
                            <Col>
                                {/* <TareaSearchContainer /> */}
                                <AddTareasSelectTareaContainer
                                    actividadId={this.state.actividad ? this.props.actividadId : null}
                                    clone={this.props.clone} referencedTareas={this.state.referencedTareas}
                                    nextTarea={this.remainingTareas().length > 0 ? this.remainingTareas()[0] : null}
                                    disabled={this.props.chosenTareas.length === this.state.clonedTareas.length}
                                    chosenTareas={this.props.chosenTareas}
                                />
                            </Col>
                        </Row>
                    </>
        )
    }
}

function mapStateToProps(state) {
    const { chosenTareas } = state.actividadTareas;
    return {
        chosenTareas
    }
}

export default connect(mapStateToProps)(AddTareaContainer);