import React from 'react';
import ActionList from '../UI/ActionList';
import LoadSpinner from '../UI/LoadSpinner';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../UI/ButtonSpinner';

const PlanificacionEditNoJumps = ({ elements, onChangeChecks, isLoading, errorMessage, onSubmit, saveSuccess, actividadId, buttonLoading }) => (
    isLoading ?
        <LoadSpinner /> :
        errorMessage ?
            <span className="text-danger">{errorMessage}</span> :
            <>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Alert variant="info">
                            <i>
                                Elegí cuales de las tareas pueden ser opcionales
                    </i>
                        </Alert>
                        <ActionList dataCy={"elements"} items={elements} field={"nombre"} value={"id"}
                            checkboxGroup={{
                                items: [{ nombre: "Opcional", codigo: "opt" }], onChange: onChangeChecks,
                                field: "nombre", value: "codigo"
                            }} />
                        {saveSuccess ?
                            <Link to={`/actividad/${actividadId}/mostrar`}>
                                <Button className="float-right">Continuar</Button>
                            </Link>
                            :
                            buttonLoading ?
                                <ButtonSpinner className="float-right"/>
                                :
                                <Button className="float-right" onClick={onSubmit}>Guardar</Button>
                        }
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </>
)

export default PlanificacionEditNoJumps;