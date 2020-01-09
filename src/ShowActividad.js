import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { API_BASE_URL } from './config';

class ShowActividad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividad: null,
            tareas: [],
            errors: false
        }
        this.getActividad = this.getActividad.bind(this);
        this.getTareas = this.getTareas.bind(this);
        this.getActividad();
        this.getTareas();
    }

    async getActividad() {
        const response = await fetch(API_BASE_URL + '/actividades/' + this.props.actividadId);
        const data = await response.json();
        if (!data.errors) {
            this.setState({
                actividad: data
            })
        } else {
            this.setState({
                errors: true
            })
        }
    }

    async getTareas() {
        const response = await fetch(API_BASE_URL + '/actividades/' + this.props.actividadId + '/tareas');
        const data = await response.json();
        if (!data.errors) {
            this.setState({
                tareas: data
            })
        } else {
            this.setState({
                errors: true
            })
        }
    }

    render() {
        const { actividad, tareas, errors } = this.state;
        return (
            <>
                {
                    actividad &&
                    <>
                        <Row>
                            <Col>Nombre: {actividad.nombre}</Col>
                        </Row>
                        <Row>
                            <Col>Objetivo: {actividad.objetivo}</Col>
                        </Row>
                        <Row>
                            <Col>Idioma: {actividad.idioma.nombre}</Col>
                        </Row>
                        <Row>
                            <Col>Dominio: {actividad.dominio.nombre}</Col>
                        </Row>
                        <Button href={API_BASE_URL + "/actividades/" + actividad.id + "/download"}>Descargar</Button>
                        <hr />
                        <Row>
                            <Col>
                                <legend>Tareas</legend>
                                <ul>
                                    {tareas.map(tarea =>
                                        <li>{tarea.nombre}</li>
                                    )}
                                </ul>
                            </Col>
                        </Row>
                    </>
                }
                {errors && <legend>Actividad no encontrada</legend>}
            </>
        )
    }
}

export default ShowActividad;