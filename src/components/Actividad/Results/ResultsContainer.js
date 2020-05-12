import React, { Component } from 'react';
import ActividadResults from './Results';
import tokenManager from '../../../tokenManager';

class ResultsContainer extends Component {
    state = {
        actividad: null,
        loading: false,
        error: null
    }

    async loadActividad(id) {
        this.setState({ loading: true });
        const actividad = await tokenManager.getActividad(id);
        if (actividad.error_code) {
            this.setState({
                loading: false,
                error: actividad.user_message
            })
        } else {
            this.setState({
                actividad: actividad,
                loading: false
            })
        }
    }

    componentDidMount() {
        this.loadActividad(this.props.actividadId);
    }
    render() {
        return <ActividadResults actividad={this.state.actividad} loading={this.state.loading} error={this.state.error} />
    }
}

export default ResultsContainer;