import React from 'react';
import { Form, Button, Col, Spinner, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Input from '../Input';
import SelectAPI from './UI/SelectAPI';
import FormDominio from '../FormDominio';
import TareaExtra from '../TareaExtra';

const Tarea = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input controlId={"formNombre"}
                                    label={"Nombre"}
                                    name={"nombre"}
                                    type={"text"}
                                    placeholder={"Nombre"}
                                    onChange={props.onChange} />
                            </Col>
                            <Col>
                                <Input controlId={"formConsigna"}
                                    label={"Consigna"}
                                    name={"consigna"}
                                    type={"text"}
                                    placeholder={"Consigna"}
                                    onChange={props.onChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <SelectAPI
                                    uri={"/tipos-tarea"}
                                    attribute={"tipo"}
                                    controlId={"formTipo"}
                                    label={"Tipo"}
                                    name={"tipo"}
                                    defaultValue={""}
                                    placeholder={"Elegí un tipo"}
                                    onChange={props.onChange}
                                />
                            </Col>
                            <Col>
                                <SelectAPI
                                    uri={'/estados'}
                                    attribute={"estado"}
                                    controlId={"formEstado"}
                                    label={"Estado"}
                                    name={"estado"}
                                    defaultValue={""}
                                    placeholder={"Elegí un estado"}
                                    onChange={props.onChange}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <SelectAPI
                                    uri={'/dominios'}
                                    attribute={"dominio"}
                                    controlId={"formDominio"}
                                    label={"Dominio"}
                                    name={"dominio"}
                                    defaultValue={""}
                                    placeholder={"Elegí un dominio"}
                                    onChange={props.onChange}
                                    onPropsChangeMore={props.onPropsChangeMore}
                                />
                            </Col>
                            <Col></Col>
                        </Form.Row>
                        <Form.Row>
                            <FormDominio />
                            <Col></Col>
                        </Form.Row>

                        <hr />

                        <TareaExtra tipoTarea={props.tipoTarea} />

                        {props.error &&
                            <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                {props.errorMessage}
                            </Form.Text>
                        }
                        {props.isLoading ?
                            <Button variant="info" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Cargando...
                    </Button>
                            :
                            props.success ?
                                <Link to={"/actividad/" + props.actividadId}>
                                    <Button variant="primary" type="button" >Continuar</Button>
                                </Link>
                                :
                                <Button variant="info" type="button" disabled={props.success} onClick={props.onSubmit}>
                                    Guardar
                        </Button>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Tarea;