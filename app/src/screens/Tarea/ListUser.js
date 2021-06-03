import React from 'react';
import ListUserContainer from '../../components/Tarea/ListUserContainer';
import { Container, Row, Col } from 'react-bootstrap';

const TareaListUser = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Mis tareas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ListUserContainer />
                </Col>
            </Row>
        </Container>
    )
}

export default TareaListUser;