import React from 'react';

import LoadSpinner from '../../UI/LoadSpinner';
import { Alert, Row, Col, Tabs, Tab, Card, Table } from 'react-bootstrap';
import Icon from 'react-web-vector-icons';
import ResultsTableContainer from './TableContainer';

const ActividadResults = ({ actividad, error, loading }) => {
    return (
        loading ? <LoadSpinner />
            : error ?
                <Alert variant="danger">{error}</Alert>
                : actividad &&
                <>
                    <h1>Actividad: {actividad.nombre}</h1>
                    <div>
                        <Tabs defaultActiveKey="tabla">
                            <Tab eventKey="respuesta" title="Por respuesta">
                                <Card>
                                    <Card.Header>
                                        <Icon name="arrow-bold-left" font="Entypo" color="blue" size={"1rem"} />
                            Respuesta #31
                        <Icon name="arrow-bold-right" font="Entypo" color="blue" size={"1rem"} />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card>
                                            <Card.Header><b>Nombre</b></Card.Header>
                                            <Card.Body><b>R:</b> Carlos Ramírez</Card.Body>
                                        </Card>
                                        <br />
                                        <Card>
                                            <Card.Header><b>Funciones 1</b></Card.Header>
                                            <Card.Body><b>R:</b> f(x) = 2x + 1</Card.Body>
                                        </Card>
                                        <br />
                                        <Card>
                                            <Card.Header><b>Funciones 2</b></Card.Header>
                                            <Card.Body className="text-center">
                                                <img
                                                    style={{ width: 500 }}
                                                    src={"https://via.placeholder.com/500x500"}
                                                    alt="Foto respuesta a Funciones 2"
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </Tab>
                            <Tab eventKey="tabla" title="Tabla paginada">
                                <Card>
                                    <Card.Header>Respuestas</Card.Header>
                                    <Card.Body>
                                        <ResultsTableContainer actividadCode={actividad.codigo} />
                                    </Card.Body>
                                </Card>
                            </Tab>
                            <Tab eventKey="stats" title="Estadísticas">

                            </Tab>
                        </Tabs>
                    </div>
                </>
    )
}

export default ActividadResults;