import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import FormActividad from './FormActividad'
import loggedIn from './loggedIn';

function Actividad() {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividad</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <FormActividad />
                </Col>
            </Row>
        </Container >
    )
}

export default loggedIn(Actividad);