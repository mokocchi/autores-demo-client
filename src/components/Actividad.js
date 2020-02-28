import React from 'react';
import { Form, Button, Col, Spinner, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Input from '../Input';
import FormDominio from '../FormDominio';
import SelectAPI from '../SelectAPI';

const Actividad = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividad</h2>
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
                                <Input controlId={"formObjetivo"}
                                    label={"Objetivo"}
                                    name={"objetivo"}
                                    type={"text"}
                                    placeholder={"Objetivo"}
                                    onChange={props.onChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <SelectAPI
                                    uri={"/idiomas"}
                                    attribute={"idioma"}
                                    controlId={"formIdioma"}
                                    label={"Idioma"}
                                    name={"idioma"}
                                    defaultValue={""}
                                    placeholder={"Elegí un idioma"}
                                    onChange={props.onChange}
                                />
                            </Col>
                            <Col>
                                <SelectAPI
                                    uri={'/tipos-planificacion'}
                                    attribute={"tipo-planificacion"}
                                    controlId={"formTipoPlanificacion"}
                                    label={"Tipo de planificación"}
                                    name={"tipoPlanificacion"}
                                    defaultValue={""}
                                    placeholder={"Elegí un tipo"}
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
                                    defaultValue={props.dominioDefaultValue}
                                    placeholder={"Elegí un dominio"}
                                    onChange={props.onChange}
                                    onPropsChangeMore={props.onPropsChangeMore}
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
                            <FormDominio />
                            <Col></Col>
                        </Form.Row>
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
        </Container >
    )
}

export default Actividad;