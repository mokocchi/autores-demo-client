import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import queryString from 'query-string'
import TareaSearchContainer from '../../components/Tarea/SearchContainer';
import AddTareasSelectTareaContainer from '../../components/Actividad/AddTarea/SelectTareaContainer';
import ActividadAddTareasButtonContainer from '../../components/Actividad/AddTarea/ButtonContainer';
import AddTareasActionListContainer from '../../components/Actividad/AddTarea/TareasActionListContainer';
import GraphContainer from '../../components/Actividad/AddTarea/GraphContainer';

function getClone(search) {
    const values = queryString.parse(search)
    return values.clone || false
}

const ActividadAddTareas = ({ match: { params }, location: { search } }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Elegir tareas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <TareaSearchContainer />
                    <AddTareasSelectTareaContainer />
                    <AddTareasActionListContainer clone={getClone(search)}/>
                    <ActividadAddTareasButtonContainer actividadId={params.id} clone={getClone(search)}/>
                    {getClone(search) &&
                        <GraphContainer actividadId={getClone(search)} />
                    }
                </Col>
            </Row>
        </Container>

    )
}

export default ActividadAddTareas;