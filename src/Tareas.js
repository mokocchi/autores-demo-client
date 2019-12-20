import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap'

import BuscarTarea from './BuscarTarea'
import ListTareas from './ListTareas'

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
                        <h2>Buscar Tarea</h2>
                        <BuscarTarea onAddition={this.onAdditionTarea} />
                        <h2>Tareas de la actividad</h2>
                        <Form.Text className="text-dark">
                            Click para borrar
                        </Form.Text>
                        <ListTareas />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Tareas