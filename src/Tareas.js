import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'

import BuscarTarea from './BuscarTarea'
import ListTareas from './ListTareas'
import MisTareas from './MisTareas'

function Tareas(props) {
    let { id } = useParams();
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tareas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <BuscarTarea actividadId={id} />
                    <MisTareas actividadId={id} />
                    <ListTareas actividadId={id} />
                    <Link to={id + "/flujo"}>
                        <Button variant="primary" type="button" style={{ marginTop: "1em" }}>Continuar</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Tareas