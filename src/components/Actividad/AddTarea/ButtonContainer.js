import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
        if(tareasIds.length === 0) {
            this.setState({
                error: true,
                errorMessage: "No se eligieron tareas"
            });
            return;
        }
        this.setTareasToActividad(id, tareasIds);
    }

    render() {
        return (
            <AddTareasButton isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.actividadId}
                onSubmit={this.handleFormSubmit} error={this.state.error} errorMessage={this.state.errorMessage}
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