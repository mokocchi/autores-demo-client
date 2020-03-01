import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentActividad, addTarea } from '../../../redux/actions'

import tokenManager from '../../../tokenManager';
import AddTareasButton from './Button';

class AddTareasButtonContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        let id = props.actividadId;
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.setCurrentActividad(id);
    }

    async addTareas(id) {
        const tareas = await tokenManager.getTareasForActividad(id);
        tareas.results.forEach(tarea => this.props.dispatch(addTarea(tarea)));
    }

    async setCurrentActividad(id) {
        const data = await tokenManager.getActividad(id);
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message
            });
            return;
        }
        this.props.dispatch(setCurrentActividad(data));
        this.addTareas(id);
    }

    async setTareasToActividad(id, tareasIds) {
        this.setState({
            isLoading: true
        })
        const data = await tokenManager.setTareasToActividad({
            "tareas": tareasIds
        }, id)
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message,
                success: false,
                isLoading: false
            })
            return;
        } else {
            this.setState({ success: true, isLoading: false });
        }
    }

    async handleFormSubmit() {
        const id = this.props.actividadId;
        const tareasIds = this.props.chosenTareas.map(tarea => tarea.id);
        this.setTareasToActividad(id, tareasIds);
    }

    render() {
        return (
            <AddTareasButton isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.actividadId}
                onSubmit={this.handleFormSubmit}
            />
        )
    }

}

function mapStateToProps(state) {
    const { chosenTareas } = state.actividadTareas;
    return {
        chosenTareas
    }
}
export default connect(mapStateToProps)(AddTareasButtonContainer);