import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Graph from './Graph';
import ModalTarea from './ModalTarea';
import ModalConexion from './ModalConexion';

const PlanificacionEdit = (props) => {
    return (
        <>
            <h6 style={{ color: 'gray' }}><i>
                {props.graphConexiones.length === 0 ?
                    "Para iniciar la conexión entre tareas selecione una tarea incial"
                    : "Para conectar dos tareas seleccione una tarea"
                }
            </i></h6>
            <Row style={{ border: "1px solid black", paddingTop: "2em", paddingBottom: "2em" }}>
                <Col>
                    {props.success &&
                        <Graph tareas={props.tareas}
                            conexiones={props.conexiones} actividadId={props.actividadId}
                            onClickNode={props.onClickNode} onClickEdge={props.onClickEdge} />
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
                            onRemoveConexion={props.onRemoveConexion} />
                    }
                </Col>
            </Row>
        </>
    )
}

export default PlanificacionEdit;