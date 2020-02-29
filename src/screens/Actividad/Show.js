import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ActividadShowContainer from '../../components/Actividad/ShowContainer';

const ActividadShow = ({match: {params}}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividad</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ActividadShowContainer actividadId={params.id}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ActividadShow;