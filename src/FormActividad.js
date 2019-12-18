import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap'

import FormDominio from './FormDominio'

class FormActividad extends Component {
    render() {
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formObjetivo">
                        <Form.Label>Objetivo</Form.Label>
                        <Form.Control type="text" placeholder="Objetivo" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formIdioma">
                        <Form.Label>Idioma</Form.Label>
                        <Form.Control as="select">
                            <option>Español</option>
                            <option>English (Inglés)</option>
                            <option>日本語 (Japonés)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPlanificacion">
                        <Form.Label>Planificación</Form.Label>
                        <Form.Control as="select">
                            <option>Secuencial</option>
                            <option>Libre</option>
                            <option>Bifurcada</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formDominio">
                        <Form.Label>Dominio</Form.Label>
                        <Form.Control as="select">
                            <option>Biología</option>
                            <option>Matemática</option>
                            <option>Arte</option>
                        </Form.Control>
                        <Col />
                    </Form.Group>
                    <Col></Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <FormDominio />
                    </Col>
                    <Col />
                </Form.Row>
                <Button variant="primary" type="button">Continuar</Button>
            </Form>
        )
    }
}

export default FormActividad