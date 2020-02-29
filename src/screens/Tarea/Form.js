import React from 'react';
import TareaContainer from '../../components/Tarea/Form';
import { Container, Row, Col } from 'react-bootstrap';

const FormTarea = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{!params.id ? "Crear" : "Editar"} tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <TareaContainer />
                </Col>
            </Row>
        </Container>
    )
}

export default FormTarea;