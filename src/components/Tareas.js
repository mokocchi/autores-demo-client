import React from 'react';
import { Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BuscarTarea from '../BuscarTarea';
import ListTareas from '../ListTareas';
import MisTareas from '../MisTareas';

const Tareas = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tareas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <BuscarTarea />
                    <MisTareas />
                    <ListTareas />

                    {
                        props.isLoading ?
                            <Button variant="info" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Cargando...
                    </Button>
                            :
                            props.success ?
                                <Link to={"/actividad/" + props.actividadId + "/planificacion"}>
                                    <Button variant="primary" type="button" style={{ marginTop: "1em" }}>Continuar</Button>
                                </Link>
                                :
                                <Button variant="info" type="button" disabled={props.success} onClick={props.onSubmit}>
                                    Guardar
                        </Button>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Tareas;