import React, { Component } from 'react';
import LoadSpinner from '../UI/LoadSpinner';
import PlanificacionEditNoJumpsContainer from './EditNoJumpsContainer';
import PlanificacionEditJumpsContainer from './EditJumpsContainer';
import tokenManager from '../../tokenManager';

class EditPlanificacion extends Component {
    state = {
        actividad: null,
        errorMessage: "",
        isLoading: true
    }

    async getActividad(id) {
        const data = await tokenManager.getActividad(id);
        if (data.error_code) {
            this.setState({
                errorMessage: data.user_message,
                isLoading: false
            });
            return;
        } else {
            this.setState({
                actividad: data,
                isLoading: false
            })
        }
    }

    componentDidMount() {
        this.getActividad(this.props.actividadId);
    }
    
    render() {
        return (
            this.state.isLoading ?
                <LoadSpinner />
                : this.state.errorMessage ?
                    <span className="text-danger">{this.state.errorMessage}</span>
                    : (this.state.actividad.tipo_planificacion.nombre === "Bifurcada") ?
                        <PlanificacionEditJumpsContainer actividad={this.state.actividad} />
                        : <PlanificacionEditNoJumpsContainer actividad={this.state.actividad} />
        )
    }
}

export default EditPlanificacion;