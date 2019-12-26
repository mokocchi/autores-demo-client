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
            success: true,
            error: false,
            errorMessage: ""
        }
        let id = this.props.actividadId;
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
                            <Link to={"flujo"}>
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
    return {

    }
}
export default connect(mapStateToProps)(FormTareas);