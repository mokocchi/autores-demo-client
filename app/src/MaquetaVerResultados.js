import React from 'react';
import { Tabs, Tab, Card, Table } from 'react-bootstrap';
import Icon from 'react-web-vector-icons';

const MaquetaVerResultados = () => (
    <div>
        <Tabs defaultActiveKey="respuesta">
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
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th style={{ whiteSpace: "nowrap" }}>Código de respuesta</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Marca de tiempo</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Nombre</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 1</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 2</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 3</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 4</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 5</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 6</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 7</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Funciones 8</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>eeb9a890a0</td>
                                    <td>2020-05-01 09:20:39</td>
                                    <td>Laura Martínez</td>
                                    <td>f(x) = 2x + 4y</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>9</td>
                                    <td>f(x) = 2</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>f(x) = 19</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>49</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>9</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>eeb9a890a1</td>
                                    <td>2020-05-01 09:30:17</td>
                                    <td>Carlos Ramírez</td>
                                    <td>f(x) = 2x + 1</td>
                                    <td><img
                                        style={{ width: 150 }}
                                        src={"https://via.placeholder.com/500x500"}
                                        alt="Foto respuesta a Funciones 2"
                                    /></td>
                                    <td>19</td>
                                    <td>f(x) = 92</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>eeb9a890a2</td>
                                    <td>2020-05-01 09:32:44</td>
                                    <td>Marta Sánchez</td>
                                    <td>f(x) = 2x + 5</td>
                                    <td><img
                                        style={{ width: 150 }}
                                        src={"https://via.placeholder.com/500x500"}
                                        alt="Foto respuesta a Funciones 2"
                                    /></td>
                                    <td>42</td>
                                    <td>f(x) = 29</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>eeb9a890a3</td>
                                    <td>2020-05-01 09:35:09</td>
                                    <td>Julio Núñez</td>
                                    <td>f(x) = 2x + 4y</td>
                                    <td><img
                                        style={{ width: 150 }}
                                        src={"https://via.placeholder.com/500x500"}
                                        alt="Foto respuesta a Funciones 2"
                                    /></td>
                                    <td>9</td>
                                    <td>9</td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            style={{ width: 150 }}
                                            src={"https://via.placeholder.com/500x500"}
                                            alt="Foto respuesta a Funciones 2"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Tab>
            <Tab eventKey="stats" title="Estadísticas">

            </Tab>
        </Tabs>
    </div>
)

export default MaquetaVerResultados;