import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../../config';

function ActividadShow({ actividad, tareas, errors }) {
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

export default ActividadShow;