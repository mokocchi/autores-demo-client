import React from 'react';
import { Row, Col, Button, Alert, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';

import Graph from './Graph';
import ModalTarea from './ModalTarea';
import ModalConexion from './ModalConexion';
import ReferencesModal from './ReferencesModal';
import ButtonSpinner from '../UI/ButtonSpinner';
import demo_planif from '../../assets/img/demo_planif.png';
import dehia_arrow from '../../assets/img/dehia_arrow.svg';

const PlanificacionEdit = (props) => {
    return (
        <>
            <Row>
                <Col md={4} id="tour-panel" style={{ overflowY: "scroll", height: props.rightPanel.height }}>
                    <Card>
                        <Card.Header>
                            Tour guiado
                        </Card.Header>
                        <Card.Body>
                            Bienvenido al tour guiado de planificaciones bifurcadas. En este paso
                            a paso vas a aprender a planificar tareas para llegar a una actividad
                            como la del dibujo:
                            <img src={demo_planif} style={{ height: "7rem" }} />
                            <br />
                            <ListGroup>
                                <ListGroupItem variant="success">
                                    1 - Primero queremos ver bien la primer tarea. Mové el control de zoom completamente hacia la derecha.
                                </ListGroupItem>
                                <ListGroupItem variant="none">
                                    2 - Vamos a empezar a planificar. Para comenzar, hacé click en la primera tarea.
                                </ListGroupItem>
                                <ListGroupItem variant="secondary">
                                    3 - Para conectar la primera tarea con la segunda, en el menú que se abre hacé click en el botón <Button variant="primary" disabled>Agregar conexiones</Button>
                                </ListGroupItem>
                                <ListGroupItem variant="secondary">
                                    4 - Ahora nos toca elegir la tarea siguiente, para que se cree una conexión entre las dos.
                                    En <i>Hacia la tarea...</i> hacé click en <select disabled><option>Elegir siguiente</option></select> y seleccioná la tarea <b>Tarea con opciones 1</b>
                                </ListGroupItem>
                                <ListGroupItem variant="secondary">
                                    5 - Para terminar de crear la conexión, hacé click en <Button variant="success" disabled>Agregar conexión</Button>
                                </ListGroupItem>
                                <ListGroupItem variant="secondary">
                                    6 - ¡Muy bien! Tenemos la primera conexión. Para poder ver la segunda tarea, hacé click en el fondo gris y arrastrá hacia la izquierda hasta que aparezca la segunda tarea, que dice <b><i>Fin 2</i></b>.
                                </ListGroupItem>
                                <ListGroupItem>
                                    7 - ¿Qué pasa si nos equivocamos de conexión? Hacé click en el círculo que está en medio de la flecha entre las dos tareas.
                                </ListGroupItem>
                                <ListGroupItem>
                                    8 - En el menú que aparece hay un botón <Button variant="danger" disabled>Quitar conexión</Button>. Para borrar la conexión que acabamos de crear, hacé click en ese botón.
                                </ListGroupItem>
                                <ListGroupItem>
                                    9 - Hacé click en el botón del cuadrado del control de zoom para centrar las tareas.<button style={{
                                        width: "27px",
                                        backgroundColor: "white",
                                        padding: "2px",
                                        justifyContent: "center",
                                        display: "flex"
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500" fill="#1e90ff">
                                            <path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path>
                                        </svg>
                                    </button>
                                </ListGroupItem>
                                <ListGroupItem>
                                    10 - Ahora volvé a crear la conexión como estaba antes. Si no te acordás, podés revisar los pasos 1-5.
                                </ListGroupItem>
                                <ListGroupItem>
                                    11 - Ahora vamos a crear una conexión con una condición, de la segunda tarea a la tercera. Hacé click en la segunda tarea.
                                </ListGroupItem>
                                <ListGroupItem>
                                    12 - Hacé click en el botón <Button variant="primary" disabled>Agregar conexiones</Button> y en el selector <select disabled><option>Elegir siguiente</option></select> elegí la tarea <b><i>3. Tarea Simple 2</i></b>.
                                </ListGroupItem>
                                <ListGroupItem>
                                    13 - Esta vez, antes de crear la conexión, vamos a indicar la condición para que esa tarea sea la siguiente: hacé click en la cajita de <input type="checkbox" /> Mostrar condición.
                                </ListGroupItem>
                                <ListGroupItem>
                                    14 - Ahora aparece una lista de condiciones posibles. Queremos que se pase a esa tarea cuando se elige la opción Uno. Para esto elegimos en el primer selector "Cuando..."
                                    <select disabled><option>Elegir...</option></select> donde dice <b><i>Sí se elige</i></b>. En el segundo selector elegir <b><i>Uno</i></b>.
                                </ListGroupItem>
                                <ListGroupItem>
                                    15 - Una vez que elegiste las dos opciones, hacé click en <Button variant="success" disabled>Agregar conexión</Button>
                                </ListGroupItem>
                                <ListGroupItem>
                                    16 - ¡Genial! Ahora hay una flecha nueva, pero esta vez tiene un cuadrado... Esto quiere decir que la conexión tiene una condición. Para ver la condición, hacé click en el cuadrado
                                    (si no ves la flecha acordate que podés acomodar el gráfico haciendo click en el fondo y arrastrando,  moviendo el control de zoom o haciendo click en el botón cuadrado del control de zoom)
                                </ListGroupItem>
                                <ListGroupItem>
                                    17 - Ahora creá una conexión igual a la anterior, pero esta vez de la segunda tarea a la cuarta, <b><i>cuando no se elige la opción Dos</i></b>
                                </ListGroupItem>
                                <ListGroupItem>
                                    18 - Para terminar, vamos a conectar la última tarea. Creá una conexión simple entre la tercera tarea y la quinta tarea.
                                </ListGroupItem>
                                <ListGroupItem>
                                    19 - ¡Listo! ¿Quedó como el dibujo?
                                    <img src={demo_planif} style={{ height: "6rem" }} />
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col id="right-panel" >
                    <div id="opacity" style={{
                        backgroundColor: "black",
                        opacity: "25%",
                        width: props.rightPanel.width,
                        height: props.rightPanel.height,
                        zIndex: 1,
                        position: "absolute",
                        marginLeft: "-15px",
                        display: (props.step > 1)? "none": "auto"
                    }} />
                    <Alert variant="info">
                        <i>
                            {props.graphConexiones.length === 0 ?
                                "Para iniciar la conexión entre tareas selecioná una tarea incial"
                                : "Para conectar dos tareas seleccioná una tarea"
                            }
                            {
                                props.clone && " - Para elegir las opciones nuevas hacé click en una conexión con cruz"
                            }
                        </i>
                        {" "}<Button size="xs" onClick={props.onClickReferences}><Icon name="md-information-circle-outline" font="Ionicons" color="white" size={"1rem"} /></Button>
                    </Alert>
                    <img src={dehia_arrow} style={{left: props.slider.x - (props.slider.width * 0.35) - (props.rightPanel.width / 2), top: (props.slider.y - 200), position: "absolute", zIndex: 2, display: (props.step > 1) ? "none": "auto"}} />
                    <img src={dehia_arrow} style={{left: props.firstCircle.x - (props.firstCircle.width * 0.25)  - (props.rightPanel.width / 2), top: (props.firstCircle.y - 170), position: "absolute", zIndex: 2, display: (props.step > 2)? "none": "auto"}} />
                    <Row style={{ border: "1px solid black", paddingTop: "2em", paddingBottom: "2em" }}>
                        <Col id="graph-col">
                            {props.success &&
                                <div style={{ position: "relative" }}>
                                    <Graph tareas={props.tareas}
                                        conexiones={props.conexiones} actividadId={props.actividadId}
                                        onClickNode={props.onClickNode} onClickEdge={props.onClickEdge} />
                                </div>
                            }
                            {props.success &&
                                props.saveSuccess ?
                                <Link to="./mostrar">
                                    <Button type="button" className="float-right" variant="info">Continuar</Button>
                                </Link>
                                :
                                props.isLoadingSave ? <ButtonSpinner className="float-right" />
                                    :
                                    <>
                                        {props.errors && <span className="text-danger">{props.errors}</span>}
                                        <Button type="button" className="float-right" variant="info" onClick={props.onGuardarClick} >Guardar</Button>
                                    </>
                            }
                            {props.selectedTarea &&
                                <ModalTarea key={props.selectedTarea.id} handleClose={props.handleCloseTarea}
                                    show={props.showTarea} onShow={props.onShowTarea} tarea={props.selectedTarea} tareas={props.tareas}
                                    conexiones={props.conexiones} onUpdateTarea={props.onUpdateTarea} onAddConexion={props.onAddConexion}
                                />}
                            {props.selectedConexion &&
                                <ModalConexion key={props.selectedConexion.id} handleClose={props.handleCloseConexion}
                                    show={props.showConexion} onShow={props.onShowConexion} conexion={props.selectedConexion} tareas={props.tareas}
                                    onRemoveConexion={props.onRemoveConexion} clone={props.clone} opciones={props.selectedOpciones}
                                    setOpcion={props.setOpcion} />
                            }
                            {props.showReferences &&
                                <ReferencesModal show={props.showReferences} onHide={props.onHideReferences} />
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default PlanificacionEdit;