import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import loggedIn from './loggedIn';
import FormActividadContainer from './containers/FormActividadContainer';

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
                    <FormActividadContainer />
                </Col>
            </Row>
        </Container >
    )
}

export default loggedIn(Actividad);