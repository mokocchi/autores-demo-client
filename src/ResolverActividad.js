import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ShowActividad from './ShowActividad';


function ResolverActividad() {
    const { id } = useParams();
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividad</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ShowActividad actividadId={id} />
                </Col>
            </Row>
        </Container>
    )
}

export default ResolverActividad;