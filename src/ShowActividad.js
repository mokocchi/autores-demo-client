import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { API_BASE_URL } from './config';
import tokenManager from './tokenManager';

class ShowActividad extends Component {

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
        const data = await tokenManager.getActividad(this.props.actividadId)
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

        const tareasData = await tokenManager.getTareasForActividad(this.props.actividadId);
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