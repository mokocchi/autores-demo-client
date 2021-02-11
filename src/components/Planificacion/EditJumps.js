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
                {props.tour &&
                    <Col md={(props.startTour ? 4 : 12)} id="tour-panel" style={{ overflowY: "scroll", height: "32rem" }}>
                        <Card>
                            <Card.Header>
                                Tour guiado
                        </Card.Header>
                            <Card.Body>
                                {!props.startTour &&
                                    <div>
                                        Bienvenido al tour guiado de planificaciones bifurcadas.
                                        <br />En este paso
                                        a paso vas a aprender a planificar tareas para llegar a una actividad
                                        como la del dibujo:
                                        <br />
                                        <img src={demo_planif} style={{ width: "40rem" }} />
                                        <br />
                                        <Button variant="info" onClick={props.onStartTour}>Empecemos</Button>
                                    </div>
                                }
                                {props.startTour &&
                                    <ListGroup>
                                        <ListGroupItem id="step-1" variant={props.step > 1 ? "secondary" : "none"}
                                            style={{
                                                borderWidth: (props.step == 1) && "3px",
                                                borderColor: (props.step == 1) && "black"
                                            }}>
                                            1 - Primero queremos ver bien la primer tarea. Mové el control de zoom completamente hacia la derecha.
                                </ListGroupItem>
                                        {(props.step > 1) &&
                                            <ListGroupItem id="step-2" variant={props.step > 2 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 2) && "3px",
                                                    borderColor: (props.step == 2) && "black"
                                                }}>
                                                2 - Vamos a empezar a planificar. Para comenzar, hacé click en la primera tarea.
                                </ListGroupItem>
                                        }
                                        {(props.step > 2) &&
                                            <ListGroupItem id="step-3" variant={props.step > 3 ? "secondary" : "none"}
                                                style={{
                                                    zIndex: (props.step == 3) ? 1060 : "auto",
                                                    borderWidth: (props.step == 3) && "3px",
                                                    borderColor: (props.step == 3) && "black"
                                                }}
                                            >
                                                3 - Para conectar la primera tarea con la segunda, en el menú que se abre hacé click en el botón <Button variant="primary" disabled>Agregar conexiones</Button>
                                            </ListGroupItem>
                                        }
                                        {(props.step > 3) &&
                                            <ListGroupItem id="step-4" variant={props.step > 4 ? "secondary" : "none"}
                                                style={{
                                                    zIndex: (props.step == 4) ? 1060 : "auto", borderWidth: (props.step == 4) && "3px",
                                                    borderColor: (props.step == 4) && "black"
                                                }}>
                                                4 - Ahora nos toca elegir la tarea siguiente, para que se cree una conexión entre las dos.
                                    En <i>Hacia la tarea...</i> hacé click en <select disabled><option>Elegir siguiente</option></select> y seleccioná la tarea <b>Tarea con opciones 1</b>
                                            </ListGroupItem>
                                        }
                                        {(props.step > 4) &&
                                            <ListGroupItem id="step-5" variant={props.step > 5 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 5) && "3px",
                                                    borderColor: (props.step == 5) && "black"
                                                }}>
                                                5 - Para terminar de crear la conexión, hacé click en <Button variant="success" disabled>Agregar conexión</Button>
                                            </ListGroupItem>
                                        }
                                        {(props.step > 5) &&
                                            <ListGroupItem id="step-6" variant={props.step > 6 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 6) && "3px",
                                                    borderColor: (props.step == 6) && "black"
                                                }}>
                                                6 - ¡Muy bien! Tenemos la primera conexión. Para poder ver la segunda tarea, hacé click en el fondo gris y arrastrá hacia la izquierda hasta que aparezca la segunda tarea, que dice <b><i>Fin 2</i></b>.
                                </ListGroupItem>
                                        }
                                        {(props.step > 6) &&
                                            <ListGroupItem id="step-7" variant={props.step > 7 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 7) && "3px",
                                                    borderColor: (props.step == 7) && "black"
                                                }}>
                                                7 - ¿Qué pasa si nos equivocamos de conexión? Hacé click en el círculo que está en medio de la flecha entre las dos tareas.
                                </ListGroupItem>
                                        }
                                        {(props.step > 7) &&
                                            <ListGroupItem id="step-8" variant={props.step > 8 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 8) && "3px",
                                                    borderColor: (props.step == 8) && "black"
                                                }}>
                                                8 - En el menú que aparece hay un botón <Button variant="danger" disabled>Quitar conexión</Button>. Para borrar la conexión que acabamos de crear, hacé click en ese botón.
                                </ListGroupItem>
                                        }
                                        {(props.step > 8) &&
                                            <ListGroupItem id="step-9" variant={props.step > 9 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 9) && "3px",
                                                    borderColor: (props.step == 9) && "black"
                                                }}>
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
                                        }
                                        {(props.step > 9) &&
                                            <ListGroupItem id="step-10" variant={props.step > 10 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 10) && "3px",
                                                    borderColor: (props.step == 10) && "black"
                                                }}>
                                                10 - Ahora volvé a crear la conexión como estaba antes. Si no te acordás, podés revisar los pasos 1-5.
                                </ListGroupItem>
                                        }
                                        {(props.step > 10) &&
                                            <ListGroupItem id="step-11" variant={props.step > 11 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 11) && "3px",
                                                    borderColor: (props.step == 11) && "black"
                                                }}>
                                                11 - Ahora vamos a crear una conexión con una condición, de la segunda tarea a la tercera. Hacé click en la segunda tarea.
                                </ListGroupItem>
                                        }
                                        {(props.step > 11) &&
                                            <ListGroupItem id="step-12" variant={props.step > 12 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 12) && "3px",
                                                    borderColor: (props.step == 12) && "black"
                                                }}>
                                                12 - Hacé click en el botón <Button variant="primary" disabled>Agregar conexiones</Button> y en el selector <select disabled><option>Elegir siguiente</option></select> elegí la tarea <b><i>3. Tarea Simple 2</i></b>.
                                </ListGroupItem>
                                        }
                                        {(props.step > 12) &&
                                            <ListGroupItem id="step-13" variant={props.step > 13 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 13) && "3px",
                                                    borderColor: (props.step == 13) && "black"
                                                }}>
                                                13 - Esta vez, antes de crear la conexión, vamos a indicar la condición para que esa tarea sea la siguiente: hacé click en la cajita de <input type="checkbox" /> Mostrar condición.
                                </ListGroupItem>
                                        }
                                        {(props.step > 13) &&
                                            <ListGroupItem id="step-14" variant={props.step > 14 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 14) && "3px",
                                                    borderColor: (props.step == 14) && "black"
                                                }}>
                                                14 - Ahora aparece una lista de condiciones posibles. Queremos que se pase a esa tarea cuando se elige la opción Uno. Para esto elegimos en el primer selector "Cuando..."
                                    <select disabled><option>Elegir...</option></select> donde dice <b><i>Sí se elige</i></b>. En el segundo selector elegir <b><i>Uno</i></b>.
                                </ListGroupItem>
                                        }
                                        {(props.step > 14) &&
                                            <ListGroupItem id="step-15" variant={props.step > 15 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 15) && "3px",
                                                    borderColor: (props.step == 15) && "black"
                                                }}>
                                                15 - Una vez que elegiste las dos opciones, hacé click en <Button variant="success" disabled>Agregar conexión</Button>
                                            </ListGroupItem>
                                        }
                                        {(props.step > 15) &&
                                            <ListGroupItem id="step-16" variant={props.step > 16 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 16) && "3px",
                                                    borderColor: (props.step == 16) && "black"
                                                }}>
                                                16 - ¡Genial! Ahora hay una flecha nueva, pero esta vez tiene un cuadrado... Esto quiere decir que la conexión tiene una condición. Para ver la condición, hacé click en el cuadrado
                                                (si no ves la flecha acordate que podés acomodar el gráfico haciendo click en el fondo y arrastrando,  moviendo el control de zoom o haciendo click en el botón cuadrado del control de zoom)
                                </ListGroupItem>
                                        }
                                        {(props.step > 16) &&
                                            <ListGroupItem id="step-17" variant={props.step > 17 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 17) && "3px",
                                                    borderColor: (props.step == 17) && "black"
                                                }}>
                                                17 - Ahora creá una conexión igual a la anterior, pero esta vez de la segunda tarea a la cuarta, <b><i>cuando no se elige la opción Dos</i></b>
                                            </ListGroupItem>
                                        }
                                        {(props.step > 17) &&
                                            <ListGroupItem id="step-18" variant={props.step > 18 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 18) && "3px",
                                                    borderColor: (props.step == 18) && "black"
                                                }}>
                                                18 - Para terminar, vamos a conectar la última tarea. Creá una conexión simple entre la tercera tarea y la quinta tarea.
                                </ListGroupItem>
                                        }
                                        {(props.step > 18) &&
                                            <ListGroupItem variant={props.step > 19 ? "secondary" : "none"}
                                                style={{
                                                    borderWidth: (props.step == 19) && "3px",
                                                    borderColor: (props.step == 19) && "black"
                                                }}>
                                                19 - ¡Listo! ¿Quedó como el dibujo?
                                    <img src={demo_planif} style={{ height: "6rem" }} />
                                            </ListGroupItem>
                                        }
                                    </ListGroup>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                }
                {(!props.tour || props.startTour) &&
                    <Col id="right-panel" >
                        {props.tour && (props.step == 1) &&
                            <div id="opacity" style={{
                                backgroundColor: "black",
                                opacity: "25%",
                                width: props.rightPanel.width,
                                height: props.rightPanel.height,
                                zIndex: 1,
                                position: "absolute",
                                marginLeft: "-15px",
                                display: "auto"
                            }} />
                        }
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
                        {props.tour
                            &&
                            (props.step == 1 &&
                                <img src={dehia_arrow} style={{ left: props.slider.x - (props.slider.width * 0.35) - (props.rightPanel.width / 2), top: (props.slider.y - 200), position: "absolute", zIndex: 2 }} />
                            ) ||
                            (props.step == 2 &&
                                <img src={dehia_arrow} style={{ left: props.firstCircle.x - (props.firstCircle.width * 0.25) - (props.rightPanel.width / 2), top: (props.firstCircle.y - 170), position: "absolute", zIndex: 2 }} />
                            )
                        }
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
                }
            </Row>
        </>
    )
}

export default PlanificacionEdit;