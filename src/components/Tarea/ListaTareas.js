import React from 'react';
import ShowLinksList from '../UI/ShowLinksList';
import { Container, Row, Col } from 'react-bootstrap';

const ListaTareas = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tareas públicas</h2>
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

export default ListaTareas;