import React from 'react';
import ActividadListUserContainer from '../../components/Actividad/ListUserContainer';
import { Container, Row, Col } from 'react-bootstrap';

const ActividadListUser = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Mis actividades</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ActividadListUserContainer />
                </Col>
            </Row>
        </Container >
    )
}

export default ActividadListUser;