import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import queryString from 'query-string';
import AddTareaContainer from '../../components/Actividad/AddTarea/AddTareaContainer';

function getClone(search) {
    const values = queryString.parse(search)
    return values.clone || false
}

const ActividadAddTareas = ({ match: { params }, location: { search } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Elegir tareas {getClone(search) && "(clonando planificación)"}</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <AddTareaContainer actividadId={params.id} clone={getClone(search)} />
                </Col>
            </Row>
        </Container>

    )
}

export default ActividadAddTareas;