import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';

import Graph from './Graph';
import ModalTarea from './ModalTarea';
import ModalConexion from './ModalConexion';
import ReferencesModal from './ReferencesModal';
import ButtonSpinner from '../UI/ButtonSpinner';
import Arrow from '../UI/Shapes/Arrow';

const PlanificacionEdit = (props) => {
    return (
        <>
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
            <Arrow rotation="90" x={props.firstCircle.x - (props.firstCircle.width * 0.25)}
                y={props.firstCircle.y} fill={"orange"} />
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
        </>
    )
}

export default PlanificacionEdit;