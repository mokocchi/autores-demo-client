import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../../config';
import Graph from '../Planificacion/Graph';

function ActividadShow({ actividad, tareas, conexiones, errors }) {
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
                    <Button href={API_BASE_URL + "/public/actividades/" + actividad.id + "/data"}>Descargar</Button>
                    <hr />
                    <Row>
                        <Col>
                            <legend>Tareas</legend>
                            <ul>
                                {tareas.map(tarea =>
                                    <li key={tarea.id}>{tarea.nombre}</li>
                                )}
                            </ul>
                        </Col>
                    </Row>
                    {conexiones && <Graph dataCy={"graphShow"} tareas={tareas} conexiones={conexiones} onClickNode={() => {}}/>}
                </>
            }
            {errors && <legend>Actividad no encontrada</legend>}
        </>
    )
}

export default ActividadShow;