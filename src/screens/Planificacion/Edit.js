import React from 'react';
import queryString from 'query-string'
import PlanificacionEditContainer from '../../components/Planificacion/EditContainer';
import { Container, Row, Col } from 'react-bootstrap';

function getClone(search) {
    const values = queryString.parse(search)
    return values.clone || false
}

const PlanificacionEdit = ({ match: { params }, location: { search }  }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Planificación de tareas {getClone(search) && "(clonando)"}</h2>
                </Col>
            </Row>
            <PlanificacionEditContainer actividadId={params.id} clone={getClone(search)} />
        </Container>
    )
}

export default PlanificacionEdit;