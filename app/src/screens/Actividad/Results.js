import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ActividadResultsContainer from '../../components/Actividad/Results/ResultsContainer';

const ActividadResults = ({match: {params}}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Resultados</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <ActividadResultsContainer actividadId={params.id}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ActividadResults;