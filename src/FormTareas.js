import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentActividad, addTarea } from './redux/actions'

import BuscarTarea from './BuscarTarea';
import ListTareas from './ListTareas';
import MisTareas from './MisTareas';

import tokenManager from './tokenManager';

class FormTareas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        let id = this.props.actividadId;
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

    async addTareaToActividad(id, tarea) {
        const data = await tokenManager.addTareaToActividad({
            "tarea": tarea.id
        }, id)
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message,
                success: false
            })
            return;
        } else {
            this.setState({ success: true });
        }
    }

    async handleFormSubmit() {
        const id = this.props.actividadId;
        const success = await this.detachTareas(id);
        if(success) {
            this.props.chosenTareas.forEach(tarea => this.addTareaToActividad(id, tarea));
        }
    }

    async detachTareas(id) {
        const data = await tokenManager.deleteTareasFromActividad(id);
        if (data.error_code) {
            this.setState({
                saveSuccess: false,
                errors: data.user_message
            });
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <>
                <BuscarTarea />
                <MisTareas />
                <ListTareas />

                {
                    this.state.isLoading ?
                        <Button variant="info" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Cargando...
                    </Button>
                        :
                        this.state.success ?
                            <Link to={"/actividad/" + this.props.actividadId + "/flujo"}>
                                <Button variant="primary" type="button" style={{ marginTop: "1em" }}>Continuar</Button>
                            </Link>
                            :
                            <Button variant="info" type="button" disabled={this.state.success} onClick={this.handleFormSubmit}>
                                Guardar
                        </Button>
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
export default connect(mapStateToProps)(FormTareas);