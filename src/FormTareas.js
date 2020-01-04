import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentActividad } from './redux/actions'

import BuscarTarea from './BuscarTarea';
import ListTareas from './ListTareas';
import MisTareas from './MisTareas';

import { API_BASE_URL } from './config';

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

    async setCurrentActividad(id) {
        const response = await fetch(API_BASE_URL + '/actividad/' + id);
        const data = await response.json();
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors
            });
            return;
        }
        this.props.dispatch(setCurrentActividad(data));
    }

    async addTareaToActividad(id, tarea) {
        const response = await fetch(API_BASE_URL + '/actividad/' + id + '/tarea', {
            method: 'POST',
            body: JSON.stringify({
                "tarea": tarea.id
            })
        });
        const data = await response.json();
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors,
                success: false
            })
            return;
        } else {
            this.setState({success: true});
        }
    }

    handleFormSubmit() {
        const id = this.props.actividadId;
        this.props.chosenTareas.forEach(tarea => this.addTareaToActividad(id, tarea));
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