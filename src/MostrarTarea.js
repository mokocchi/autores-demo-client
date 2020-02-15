import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ShowTarea from './ShowTarea';


function MostrarTarea() {
    const { id } = useParams();
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ShowTarea tareaId={id} />
                </Col>
            </Row>
        </Container>
    )
}

export default MostrarTarea;