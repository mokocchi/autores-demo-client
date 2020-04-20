import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import queryString from 'query-string';
import FormTareaContainer from '../../components/Tarea/FormContainer';

function getClone(search) {
    const values = queryString.parse(search)
    return values.clone || false
}

const FormTarea = ({ match: { params }, location: { search } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{!params.tareaid ? "Crear" : "Editar"} tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <FormTareaContainer actividadId={params.id} clone={getClone(search)} />
                </Col>
            </Row>
        </Container>
    )
}

export default FormTarea;