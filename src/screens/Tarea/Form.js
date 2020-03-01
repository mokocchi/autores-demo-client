import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormTareaContainer from '../../components/Tarea/FormContainer';

const FormTarea = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{!params.tareaid ? "Crear" : "Editar"} tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <FormTareaContainer actividadId={params.id} />
                </Col>
            </Row>
        </Container>
    )
}

export default FormTarea;