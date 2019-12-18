import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap'

import { API_BASE_URL } from './config'
import InputDominio from './InputDominio';
import SelectElements from './SelectElements';

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
                    <SelectElements url={API_BASE_URL + '/idioma'} label={"Idioma"} controlId={"formIdioma"} />
                    <SelectElements url={API_BASE_URL + '/planificacion'} label={"Planificación"} controlId={"formPlanificacion"} />
                </Form.Row>
                <InputDominio url={API_BASE_URL + '/dominio'}/>
                <Button variant="primary" type="button">Continuar</Button>
            </Form>
        )
    }
}

export default FormActividad