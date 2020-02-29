import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ActividadFormContainer from '../../components/Actividad/FormContainer';

const ActividadForm = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>
                        {!params.id ? "Crear" : "Editar"} actividad
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ActividadFormContainer />
                </Col>
            </Row>
        </Container >
    )
}

export default ActividadForm;