import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import FormTarea from './FormTarea'
import loggedIn from './loggedIn';

function Tarea(props) {
    let { id } = useParams();
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <FormTarea actividadId={id}/>
                </Col>
            </Row>
        </Container >
    )
}

export default loggedIn(Tarea)