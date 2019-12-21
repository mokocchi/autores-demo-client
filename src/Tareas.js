import React from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import BuscarTarea from './BuscarTarea'
import ListTareas from './ListTareas'

function Tareas(props) {
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
                    <h2>Buscar Tarea</h2>
                    <BuscarTarea actividadId={id} />
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

export default Tareas