import React from 'react';
import TareaShowContainer from '../../components/Tarea/ShowContainer';
import { Container, Row, Col } from 'react-bootstrap';

const TareaShow = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <TareaShowContainer actividadId={params.id} />
                </Col>
            </Row>
        </Container>
    )
}

export default TareaShow;