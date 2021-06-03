import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ActividadPublicListContainer from '../../components/Actividad/PublicListContainer';

const ActividadPublicList = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividades públicas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ActividadPublicListContainer />
                </Col>
            </Row>
        </Container>
    )
}

export default ActividadPublicList