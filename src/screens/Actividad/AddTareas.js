import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TareaSearchContainer from '../../components/Tarea/SearchContainer';
import AddTareasSelectTareaContainer from '../../components/Actividad/AddTarea/SelectTareaContainer';
import ActividadAddTareasButtonContainer from '../../components/Actividad/AddTarea/ButtonContainer';
import AddTareasActionListContainer from '../../components/Actividad/AddTarea/TareasActionListContainer';

const ActividadAddTareas = ({ match: { params } }) => {
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
                    <AddTareasActionListContainer />
                    <ActividadAddTareasButtonContainer actividadId={params.id} />
                </Col>
            </Row>
        </Container>

    )
}

export default ActividadAddTareas;