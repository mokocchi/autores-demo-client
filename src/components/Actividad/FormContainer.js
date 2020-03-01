import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCurrentActividad } from '../../redux/actions'

import tokenManager from '../../tokenManager';

import ActividadForm from './Form';

class ActividadFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async handleFormSubmit(values) {
        const { nombre, objetivo, idioma, tipoPlanificacion, dominio, estado, codigo } = values;
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });
        const actividad = await tokenManager.createActividad({
            "nombre": nombre,
            "objetivo": objetivo,
            "codigo": codigo,
            "dominio": dominio,
            "idioma": idioma,
            "tipoPlanificacion": tipoPlanificacion,
            "estado": estado
        })
        if (actividad.error_code) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: actividad.user_message
            });
            return
        }

        this.setState({
            success: true,
            isLoading: false,
            error: false,
            errorMessage: ''
        });
        this.props.dispatch(setCurrentActividad(actividad));
    }

    render() {
        return (
            <ActividadForm onChange={this.handleInput} dominioDefaultValue={this.props.currentDominioId}
                error={this.state.error} errorMessage={this.state.errorMessage}
                isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.currentActividad.id}
                onSubmit={this.handleFormSubmit}
            />
        )
    }
}

function mapStateToProps(state) {
    const { actividad } = state
    const { currentActividad, currentDominioId } = actividad
    return {
        currentActividad,
        currentDominioId
    }
}

export default connect(mapStateToProps)(ActividadFormContainer);