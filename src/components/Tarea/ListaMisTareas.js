import React from 'react';
import ShowLinksList from '../UI/ShowLinksList';
import { Container, Row, Col } from 'react-bootstrap';

const ListaMisTareas = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Mis tareas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    {props.success && <ShowLinksList uriPrefix="/tarea" items={props.tareas} />}
                </Col>
            </Row>
        </Container>
    )
}

export default ListaMisTareas;