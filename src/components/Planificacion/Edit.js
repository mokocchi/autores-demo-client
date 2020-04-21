import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Graph from './Graph';
import ModalTarea from './ModalTarea';
import ModalConexion from './ModalConexion';

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
            </Alert>
            <Row style={{ border: "1px solid black", paddingTop: "2em", paddingBottom: "2em" }}>
                <Col>
                    {props.success &&
                        <div style={{ position: "relative" }}>
                            <Graph tareas={props.tareas}
                                conexiones={props.conexiones} actividadId={props.actividadId}
                                onClickNode={props.onClickNode} onClickEdge={props.onClickEdge} />
                        </div>
                    }
                    {props.success && !props.saveSuccess &&
                        <Button type="button" className="float-right" variant="info" onClick={props.onGuardarClick} >Guardar</Button>
                    }
                    {props.saveSuccess &&
                        <Link to="./mostrar">
                            <Button type="button" className="float-right" variant="info">Continuar</Button>
                        </Link>
                    }
                    {props.selectedTarea &&
                        <ModalTarea key={props.selectedTarea.id} handleClose={props.handleCloseTarea}
                            show={props.showTarea} tarea={props.selectedTarea} tareas={props.tareas}
                            conexiones={props.conexiones} onUpdateTarea={props.onUpdateTarea} onAddConexion={props.onAddConexion}
                        />}
                    {props.selectedConexion &&
                        <ModalConexion key={props.selectedConexion.id} handleClose={props.handleCloseConexion}
                            show={props.showConexion} conexion={props.selectedConexion} tareas={props.tareas}
                            onRemoveConexion={props.onRemoveConexion} clone={props.clone} opciones={props.selectedOpciones}
                            setOpcion={props.setOpcion} />
                    }
                </Col>
            </Row>
        </>
    )
}

export default PlanificacionEdit;