import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../../config';
import Graph from '../Planificacion/Graph';
import { Link } from 'react-router-dom';

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
                    <Row>
                        <Col>Tipo de planificación: {actividad.tipo_planificacion.nombre}</Col>
                    </Row>
                    <Button href={API_BASE_URL + "/public/actividades/" + actividad.id + "/data"}>Descargar</Button>
                    <hr />
                    <Row>
                        <Col>
                            <legend>Tareas</legend>
                            <ul>
                                {tareas.map(tarea =>
                                    <li key={tarea.id}>
                                        <Link to={`/tarea/${tarea.id}/mostrar`} >
                                            {tarea.nombre} {tarea.optional && "(Opcional)"}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </Col>
                    </Row>
                    {
                        actividad.tipo_planificacion.nombre === "Bifurcada" &&
                        <>
                            {conexiones && <Graph dataCy={"graphShow"} tareas={tareas} conexiones={conexiones} onClickNode={() => { }} />}
                            {(actividad.tipo_planificacion.nombre === "Bifurcada") && <Button variant="success" className="float-right" href={`/nuevaActividad/?clone=${actividad.id}`}>Crear actividad a partir de esta planificación</Button>}
                        </>
                    }

                </>
            }
            {errors && <legend>Actividad no encontrada</legend>}
        </>
    )
}

export default ActividadShow;