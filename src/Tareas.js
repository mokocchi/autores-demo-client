import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap'

import FormTareas from './FormTareas'

class Tareas extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Tareas</h2>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ border: "1px solid black", padding: "2em" }}>
                        <FormTareas/>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default Tareas