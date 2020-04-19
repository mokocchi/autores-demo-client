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

class AddTareaContainer extends Component {
    constructor() {
        super();
        this.state = {
            actividad: null,
            clonedTareas: [],
            isLoading: true
        }
        this.getActividad = this.getActividad.bind(this);
        this.getClonedTareas = this.getClonedTareas.bind(this);
    }

    async getActividad() {
        const actividad = await tokenManager.getActividad(this.props.actividadId);
        if (actividad.error_code) {
            //TODO: set error messages
            return;
        }
        this.setState({
            actividad: actividad,
            isLoading: false
        });
    }

    async getClonedTareas() {
        const clonedTareas = await tokenManager.getTareasForActividad(this.props.clone);
        if (clonedTareas.error_code) {
            //TODO: set error messages
            return;
        }
        this.setState({
            clonedTareas: clonedTareas.results
        });
    }

    componentDidMount() {
        this.getActividad();
        if (this.props.clone) {
            this.getClonedTareas();
        }
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
                <>
                    <TareaSearchContainer />
                    <AddTareasSelectTareaContainer
                        actividadId={this.state.actividad ? this.props.actividadId : null}
                        clone={this.props.clone}
                        disabled={this.props.chosenTareas.length === this.state.clonedTareas.length}
                    />
                    <AddTareasActionListContainer
                        clone={this.props.clone}
                        clonedTareas={this.state.clonedTareas}
                        remainingTareas={this.remainingTareas()}
                    />
                    {this.props.clone && <PendingTareasListContainer remainingTareas={this.remainingTareas()} />}
                    {this.state.actividad && <ActividadAddTareasButtonContainer actividadId={this.state.actividad.id} clone={this.props.clone}
                        bifurcada={this.state.actividad.tipo_planificacion.nombre === "Bifurcada"} />}
                    {this.props.clone &&
                        <GraphContainer actividadId={this.props.clone} />
                    }
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