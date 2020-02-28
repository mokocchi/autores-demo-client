import React, { Component } from 'react';

import tokenManager from '../tokenManager';
import MostrarActividad from '../components/MostrarActividad';

class MostrarActividadContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividad: null,
            tareas: [],
            errors: false
        }
        this.getActividadAndTareas = this.getActividadAndTareas.bind(this);
        this.getActividadAndTareas();
    }

    async getActividadAndTareas() {
        const data = await tokenManager.getActividad(this.props.match.params.id)
        if (!data.error_code) {
            this.setState({
                actividad: data
            })
        } else {
            this.setState({
                errors: true
            })
            return;
        }

        const tareasData = await tokenManager.getTareasForActividad(data.id);
        if (!tareasData.error_code) {
            this.setState({
                tareas: tareasData.results
            })
        } else {
            this.setState({
                errors: true
            })
        }
    }

    render() {
        const { actividad, tareas, errors } = this.state;
        return <MostrarActividad actividad={actividad} tareas={tareas} errors={errors} />
    }
}

export default MostrarActividadContainer;