import React from 'react';
import TareasPublicListContainer from '../../components/Tarea/PublicListContainer';
import { Container, Row, Col } from 'react-bootstrap';

const TareaPublicList = ({ match: { params } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tareas públicas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <TareasPublicListContainer />
                </Col>
            </Row>
        </Container>
    )
}

export default TareaPublicList;