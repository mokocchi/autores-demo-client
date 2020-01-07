import React, { Component } from 'react';
import { Accordion, Card, Form, Button } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import Select from './Select';

class FlujoTareasPanel extends Component {
    render() {
        const { tareasList } = this.props;
        return (
            <>
                <Accordion key={1}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={1}>
                            1 - Levantar un pie
                                </Accordion.Toggle>
                        <Accordion.Collapse eventKey={1}>
                            <Card.Body>
                                <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                    <FormCheckInput type={"checkbox"} checked={true} onChange={this.onChange} name={"checkbox"} />
                                    Inicial
                                    </FormCheckLabel>
                                <Button variant={"danger"} className={"float-right"}>Quitar tarea</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion key={1}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={1}>
                            <span>
                                2 - Opción A
                            </span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={1}>
                            <Card.Body>
                                <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                    <FormCheckInput type={"checkbox"} onChange={this.onChange} name={"checkbox"} />
                                    <span>
                                        Inicial
                                    </span>
                                </FormCheckLabel>
                                <hr />
                                <Card body>
                                    Después de la tarea <b>1 - Levantar un pie</b>
                                    <Button variant={"danger"} className={"float-right"}>Quitar</Button>
                                </Card>
                                <Button style={{ marginTop: "1em", marginBottom: "1em" }} variant={"danger"} className={"float-right"}>Quitar tarea</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion key={1}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={1}>
                            3 - Opción B
                                </Accordion.Toggle>
                        <Accordion.Collapse eventKey={1}>
                            <Card.Body>
                                <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                    <FormCheckInput type={"checkbox"} onChange={this.onChange} name={"checkbox"} />
                                    Inicial
                                        </FormCheckLabel>
                                <hr />
                                <Card body>
                                    Después de la tarea <b>1 - Frase</b>, cuando se elige la opción 1
                                            <Button variant={"danger"} className={"float-right"}>Quitar</Button>
                                </Card>
                                <br />
                                <Button variant={"success"} className={"float-right"}>Ubicar tarea</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion key={1}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={1}>
                            4 - Opción C
                                </Accordion.Toggle>
                        <Accordion.Collapse eventKey={1}>
                            <Card.Body>
                                <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                    <FormCheckInput type={"checkbox"} onChange={this.onChange} name={"checkbox"} />
                                    Inicial
                                        </FormCheckLabel>
                                <hr />
                                <Card body>
                                    <span>
                                        Después de...
                                                <Select options={tareasList} field={"nombre"} value={"id"} />
                                    </span>
                                    <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                        <FormCheckInput checked={true} type={"checkbox"} onChange={this.onChange} name={"checkbox"} />
                                        Condición
                                        </FormCheckLabel>
                                    <p>
                                        Cuando...
                                            <Select options={["se elige", "no se elige"]} />
                                        la opción
                                                <Select options={["Opción 1", "Opción 2"]} />
                                    </p>
                                    <Button variant={"info"} className={"float-right"}>Agregar transición</Button>
                                </Card>
                                <br />
                                <Button variant={"success"} className={"float-right"}>Ubicar tarea</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion key={1}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={1}>
                            5 - Última tarea
                                </Accordion.Toggle>
                        <Accordion.Collapse eventKey={1}>
                            <Card.Body>
                                <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                    <FormCheckInput type={"checkbox"} onChange={this.onChange} name={"checkbox"} />
                                    Inicial
                                        </FormCheckLabel>
                                <hr />
                                <Card body>
                                    Después de la tarea <b>2 - Opción A</b>
                                    <Button variant={"danger"} className={"float-right"}>Quitar</Button>
                                </Card>
                                <Card body>
                                    Después de la tarea <b>3 - Opción B</b>
                                    <Button variant={"danger"} className={"float-right"}>Quitar</Button>
                                </Card>
                                <Card body>
                                    Después de la tarea <b>4 - Opción C</b>
                                    <Button variant={"danger"} className={"float-right"}>Quitar</Button>
                                </Card>
                                <Card body>
                                    <span>
                                        Después de...
                                                <Select options={tareasList} field={"nombre"} value={"id"} />
                                    </span>
                                    <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                        <FormCheckInput type={"checkbox"} onChange={this.onChange} name={"checkbox"} />
                                        Condición
                                            </FormCheckLabel>
                                    <Button variant={"info"} className={"float-right"}>Agregar transición</Button>
                                </Card>
                                <br />
                                <Button variant={"success"} className={"float-right"}>Ubicar tarea</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}

export default FlujoTareasPanel