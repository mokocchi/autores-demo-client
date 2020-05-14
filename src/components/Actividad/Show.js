import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';

import { API_BASE_URL } from '../../config';
import Graph from '../Planificacion/Graph';
import ButtonSpinner from '../UI/ButtonSpinner';

function ActividadShow({ actividad, tareas, conexiones, errors, propia,
    onClickPublicar, showModalPublicar, onHidePublicar, onClickInModalPublicar, modalPublicarLoading,
    onClickCerrar, showModalCerrar, onHideCerrar, onClickInModalCerrar, modalCerrarLoading,
    onClickReabir, showModalReabrir, onHideReabrir, onClickInModalReabrir, modalReabrirLoading,
    onClickOcultar, showModalOcultar, onHideOcultar, onClickInModalOcultar, modalOcultarLoading,
    onClickMostrar, showModalMostrar, onHideMostrar, onClickInModalMostrar, modalMostrarLoading
}) {
    return (
        <>
            {
                actividad &&
                <>
                    <Row>
                        <Col>
                            Nombre: {actividad.nombre}<br />
                            Objetivo: {actividad.objetivo}<br />
                            Idioma: {actividad.idioma.nombre}<br />
                            Dominio: {actividad.dominio.nombre}<br />
                            Tipo de planificación: {actividad.tipo_planificacion.nombre}<br />
                            <Button href={API_BASE_URL + "/public/actividades/" + actividad.id + "/data"}><Icon name="download" font="Entypo" color="white" size={"1rem"} /> Descargar</Button>
                            {" "}
                            <Link to={`/actividad/${actividad.id}/resultados`}>
                                <Button variant="dark"><Icon name="md-list" font="Ionicons" color="white" size={"1rem"} /> Ver resultados</Button>
                            </Link>
                        </Col>
                        <Col>
                            {propia && <>
                                <br />
                                {propia && actividad.definitiva &&
                                    ((actividad.estado.nombre === "Público") ?
                                        < Button variant="secondary" onClick={onClickOcultar}><Icon name="block" font="Entypo" color="white" size={"1rem"} /> Hacer privada</Button>
                                        :
                                        < Button variant="success" onClick={onClickMostrar}><Icon name="public" font="MaterialIcons" color="white" size={"1rem"} /> Hacer pública</Button>
                                    )
                                }
                                {" "}
                                {propia && (
                                    actividad.cerrada ?
                                        <Button variant="warning" onClick={onClickReabir}><Icon name="unlock" font="FontAwesome" color="black" size={"1rem"} /> Reabrir</Button>
                                        : (
                                            actividad.definitiva ?
                                                <>
                                                    <Button variant="warning" onClick={onClickCerrar}><Icon name="lock" font="FontAwesome" color="black" size={"1rem"} /> Desactivar temporalmente</Button>
                                                </>
                                                :
                                                <>
                                                    <Link to={`/actividad/${actividad.id}/planificacion`}>
                                                        <Button variant="light"><Icon name="pencil" font="FontAwesome" color="black" size={"1rem"} /> Modificar planificación</Button>
                                                    </Link>
                                                    {" "}
                                                    <Link to={`/actividad/${actividad.id}/`}>
                                                        <Button variant="light"><Icon name="pencil" font="FontAwesome" color="black" size={"1rem"} /> Elegir tareas y rehacer planificación</Button>
                                                    </Link>
                                                    <br />
                                                    <Button variant="warning" onClick={onClickPublicar}><Icon name="publish" font="Entypo" color="black" size={"1rem"} /> Guardar como definitiva</Button>
                                                </>
                                        )
                                )}
                                <br />
                    Actualmente: <br />
                                {propia && (
                                    actividad.definitiva ?
                                        <>
                                            {(actividad.estado.nombre === "Privado") ?
                                                <Button variant="outline-danger" disabled style={{ cursor: "default" }}><Icon name="cross" font="Entypo" color="red" size={"1rem"} /> No aparece en el listado público</Button>
                                                :
                                                <Button variant="outline-success" disabled style={{ cursor: "default" }}><Icon name="check" font="Entypo" color="green" size={"1rem"} /> Aparece en el listado público</Button>
                                            }
                                            <br />
                                            {actividad.cerrada ?
                                                <Button variant="outline-danger" disabled style={{ cursor: "default" }}><Icon name="cross" font="Entypo" color="red" size={"1rem"} /> No se pueden enviar respuestas</Button>
                                                :
                                                (actividad.estado.nombre === "Privado") ?
                                                    <Button variant="outline-secondary" disabled style={{ cursor: "default" }}><Icon name="key" font="Entypo" color="gray" size={"1rem"} /> Se pueden enviar respuestas si se tiene un código</Button>
                                                    :
                                                    <Button variant="outline-success" disabled style={{ cursor: "default" }}><Icon name="check" font="Entypo" color="green" size={"1rem"} /> Se pueden enviar respuestas</Button>
                                            }
                                        </>
                                        :
                                        <>
                                            <Button variant="outline-danger" disabled style={{ cursor: "default" }}><Icon name="cross" font="Entypo" color="red" size={"1rem"} /> No aparece en el listado público</Button>
                                            <br />
                                            <Button variant="outline-danger" disabled style={{ cursor: "default" }}><Icon name="cross" font="Entypo" color="red" size={"1rem"} /> No se pueden enviar respuestas</Button>
                                        </>
                                )}
                                {propia && !actividad.definitiva &&
                                    < Modal show={showModalPublicar} onHide={onHidePublicar}>
                                        <Modal.Header closeButton>
                                            Guardar como definitiva
                        </Modal.Header>
                                        <Modal.Body>
                                            Para poder recibir respuestas, la actividad tiene que ser definitiva.<br />
                            Una vez guardada, no se puede modificar.
                        </Modal.Body>
                                        <Modal.Footer>
                                            {modalPublicarLoading ?
                                                <ButtonSpinner />
                                                :
                                                <Button variant="warning" onClick={onClickInModalPublicar}><Icon name="publish" font="Entypo" color="black" size={"1rem"} /> Guardar como definitiva</Button>
                                            }
                                        </Modal.Footer>
                                    </Modal>
                                }
                                {propia && !actividad.cerrada &&
                                    <Modal show={showModalCerrar} onHide={onHideCerrar}>
                                        <Modal.Header closeButton>
                                            Desactivar temporalmente
                        </Modal.Header>
                                        <Modal.Body>
                                            No se recibirán más respuestas.<br />
                                Todavía se podrá encontrar y descargar la actividad.
                        </Modal.Body>
                                        <Modal.Footer>
                                            {modalCerrarLoading ?
                                                <ButtonSpinner />
                                                :
                                                <Button variant="warning" onClick={onClickInModalCerrar}><Icon name="lock" font="FontAwesome" color="black" size={"1rem"} /> Desactivar temporalmente</Button>
                                            }
                                        </Modal.Footer>
                                    </Modal>
                                }
                                {propia && actividad.cerrada &&
                                    <Modal show={showModalReabrir} onHide={onHideReabrir}>
                                        <Modal.Header closeButton>
                                            Reabrir
                        </Modal.Header>
                                        <Modal.Body>
                                            Volverán a recibirse respuestas
                        </Modal.Body>
                                        <Modal.Footer>
                                            {modalReabrirLoading ?
                                                <ButtonSpinner />
                                                :
                                                <Button variant="warning" onClick={onClickInModalReabrir}><Icon name="unlock" font="FontAwesome" color="black" size={"1rem"} /> Reabrir</Button>
                                            }
                                        </Modal.Footer>
                                    </Modal>
                                }
                                {propia &&
                                    <>
                                        <Modal show={showModalMostrar} onHide={onHideMostrar}>
                                            <Modal.Header closeButton>
                                                Hacer pública
                        </Modal.Header>
                                            <Modal.Body>
                                                La actividad será visible en "Actividades públicas".
                                                Cualquiera podrá enviar respuestas.
                        </Modal.Body>
                                            <Modal.Footer>
                                                {modalMostrarLoading ?
                                                    <ButtonSpinner />
                                                    :
                                                    <Button variant="success" onClick={onClickInModalMostrar}><Icon name="eye" font="FontAwesome" color="white" size={"1rem"} /> Mostrar en el listado</Button>
                                                }
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal show={showModalOcultar} onHide={onHideOcultar}>
                                            <Modal.Header closeButton>
                                                Hacer privada
                   </Modal.Header>
                                            <Modal.Body>
                                                La actividad ya no será visible en "Actividades públicas".
                                                Se requerirá un código para enviar respuestas.
                   </Modal.Body>
                                            <Modal.Footer>
                                                {modalOcultarLoading ?
                                                    <ButtonSpinner />
                                                    :
                                                    <Button variant="secondary" onClick={onClickInModalOcultar}><Icon name="block" font="Entypo" color="white" size={"1rem"} /> Hacer privada</Button>
                                                }
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                }
                            </>
                            }
                        </Col>
                    </Row>
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