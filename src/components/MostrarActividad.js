import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../config';

function MostrarActividad({actividad, tareas, errors}) {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividad</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
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
                </Col>
            </Row>
        </Container>
    )
}

export default MostrarActividad;