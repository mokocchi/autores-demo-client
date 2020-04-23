import React, { Component } from 'react';

import EditNoJumps from './EditNoJumps';
import tokenManager from '../../tokenManager';

class PlanificacionEditNoJumpsContainer extends Component {
    state = {
        elements: [],
        opcionales_ids: [],
        isLoading: true,
        errorMessage: "",
        buttonLoading: false,
        saveSuccess: false
    }

    async getTareas(id) {
        const data = await tokenManager.getTareasForActividad(id);
        if (data.error_code) {
            this.setState({
                errorMessage: data.user_message,
                isLoading: false
            })
        } else {
            this.setState({
                elements: data.results,
                isLoading: false
            })
        }
    }

    componentDidMount() {
        this.getTareas(this.props.actividad.id)
    }

    onChangeChecks = (e) => {
        const codes = e.target.name.split('-');
        const opcion = codes[0];
        const tareaId = codes[1];
        if (e.target.checked) {
            if (opcion === "opt") {
                this.setState({
                    opcionales_ids: [...this.state.opcionales_ids, tareaId]
                })
            }
        } else {
            if (opcion === "opt") {
                this.setState({
                    opcionales_ids: this.state.opcionales_ids.filter(opt => opt !== tareaId)
                })
            }
        }
    }

    async setPlanificacion(opcionales, id) {
        this.setState({
            buttonLoading: true
        });
        const data = await tokenManager.setPlanificacionInActividad({
            "saltos": [],
            "iniciales": [],
            "opcionales": opcionales
        }, id);
        if (data.error_code) {
            this.setState({
                saveSuccess: false,
                errors: data.user_message
            })
        } else {
            this.setState({
                saveSuccess: true
            })
        }
    }

    onSubmit = () => {
        this.setPlanificacion(this.state.opcionales_ids, this.props.actividad.id)
    }

    render() {
        return <EditNoJumps elements={this.state.elements} isLoading={this.state.isLoading} errorMessage={this.state.errorMessage}
            onChangeChecks={this.onChangeChecks} onSubmit={this.onSubmit} 
            saveSuccess={this.state.saveSuccess} actividadId={this.props.actividad.id} buttonLoading={this.state.buttonLoading}/>
    }
}

export default PlanificacionEditNoJumpsContainer;