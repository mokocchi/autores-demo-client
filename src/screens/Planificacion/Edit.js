import React from 'react';
import PlanificacionEditContainer from '../../components/Planificacion/EditContainer';
import { Container, Row, Col } from 'react-bootstrap';

const PlanificacionEdit = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Planificación de tareas</h2>
                </Col>
            </Row>
            <PlanificacionEditContainer actividadId={params.id} />
        </Container>
    )
}

export default PlanificacionEdit;