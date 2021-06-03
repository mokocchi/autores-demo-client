import React from 'react';
import queryString from 'query-string';
import { Container, Row, Col } from 'react-bootstrap';
import ActividadFormContainer from '../../components/Actividad/FormContainer';

function getClone(search) {
    const values = queryString.parse(search)
    return values.clone || false
}

const ActividadForm = ({ match: { params }, location: { search } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>
                        {!params.id ? "Crear" : "Editar"} actividad { getClone(search) && "(Clonando planificación)"}
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ActividadFormContainer clone={getClone(search)}/>
                </Col>
            </Row>
        </Container >
    )
}

export default ActividadForm;