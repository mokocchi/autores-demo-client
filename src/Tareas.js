import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import loggedIn from './loggedIn';
import FormTareasContainer from './containers/FormTareasContainer';

function Tareas() {
    let { id } = useParams();
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tareas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <FormTareasContainer actividadId={id}/>
                </Col>
            </Row>
        </Container>
    )
}

export default loggedIn(Tareas)