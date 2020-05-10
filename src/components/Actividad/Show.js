import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';

import { API_BASE_URL } from '../../config';
import Graph from '../Planificacion/Graph';
import ButtonSpinner from '../UI/ButtonSpinner';

function ActividadShow({ actividad, tareas, conexiones, errors, propia,
    onClickPublicar, showModalPublicar, onHidePublicar, onClickInModalPublicar, modalPublicarLoading,
    onClickCerrar, showModalCerrar, onHideCerrar, onClickInModalCerrar, modalCerrarLoading
}) {
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
                    <Button href={API_BASE_URL + "/public/actividades/" + actividad.id + "/data"}><Icon name="download" font="Entypo" color="white" size={"1rem"} /> Descargar</Button>
                    {" "}
                    {propia && (
                        actividad.cerrada ?
                            <Button variant="outline-danger" disabled style={{ cursor: "default" }}><Icon name="cross" font="Entypo" color="red" size={"1rem"} /> Cerrada</Button>
                            : (
                                actividad.definitiva ?
                                    <>
                                        <Button variant="outline-success" disabled style={{ cursor: "default" }}><Icon name="check" font="Entypo" color="green" size={"1rem"} /> Publicada</Button>
                                        {" "}
                                        <Button variant="danger" onClick={onClickCerrar}><Icon name="cross" font="Entypo" color="white" size={"1rem"} /> Dar de baja</Button>
                                    </>
                                    : <Button variant="warning" onClick={onClickPublicar}><Icon name="publish" font="Entypo" color="black" size={"1rem"} /> Publicar</Button>
                            )
                    )}
                    {propia && !actividad.definitiva && < Modal show={showModalPublicar} onHide={onHidePublicar}>
                        <Modal.Header closeButton>
                            Publicar actividad
                        </Modal.Header>
                        <Modal.Body>
                            Para poder recibir respuestas, la actividad tiene que estar publicada.<br />
                            Una vez publicada, no se puede modificar.
                        </Modal.Body>
                        <Modal.Footer>
                            {modalPublicarLoading ?
                                <ButtonSpinner />
                                :
                                <Button variant="warning" onClick={onClickInModalPublicar}><Icon name="publish" font="Entypo" color="black" size={"1rem"} /> Publicar</Button>
                            }
                        </Modal.Footer>
                    </Modal>
                    }
                    {propia && !actividad.cerrada &&
                        <Modal show={showModalCerrar} onHide={onHideCerrar}>
                            <Modal.Header closeButton>
                                Cerrar actividad
                        </Modal.Header>
                            <Modal.Body>
                                Si se da de baja una actividad, no se recibirán más respuestas.<br />
                            Esta acción no se puede deshacer.
                        </Modal.Body>
                            <Modal.Footer>
                                {modalCerrarLoading ?
                                    <ButtonSpinner />
                                    :
                                    <Button variant="danger" onClick={onClickInModalCerrar}><Icon name="cross" font="Entypo" color="white" size={"1rem"} /> Dar de baja</Button>
                                }
                            </Modal.Footer>
                        </Modal>
                    }
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