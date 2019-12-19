import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap'

import Select from './Select';
import Input from './Input';
import FormDominio from './FormDominio';

class FormActividad extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newActividad: {
                nombre: '',
                objetivo: '',
                idioma: '',
                planificacion: '',
                dominio: '',
            },

            idiomaOptions: [{
                "id": 1,
                "nombre": "Espa\u00f1ol",
                "code": "es"
            },
            {
                "id": 2,
                "nombre": "English (Ingl\u00e9s)",
                "code": "en"
            },
            {
                "id": 3,
                "nombre": "\u65e5\u672c\u8a9e (Japon\u00e9s)",
                "code": "ja"
            }],
            planificacionOptions: [
                {
                    "id": 1,
                    "nombre": "Secuencial"
                },
                {
                    "id": 2,
                    "nombre": "Libre"
                },
                {
                    "id": 3,
                    "nombre": "Bifurcada"
                }
            ],
            dominoOptions: [
                {
                    "id": 1,
                    "nombre": "Matem\u00e1tica"
                }
            ]

        }
    }

    handleFormSubmit = () => {

    }

    handleInput = () => {

    }


    render() {
        return (
            <Form>
                <Form.Row>
                    <Input controlId={"formNombre"}
                        label={"Nombre"}
                        name={"nombre"}
                        type={"text"}
                        placeholder={"Nombre"}
                        handleChange={this.handleInput} />
                    <Input controlId={"formObjetivo"}
                        label={"Objetivo"}
                        name={"objetivo"}
                        type={"text"}
                        placeholder={"Objetivo"}
                        handleChange={this.handleInput} />
                </Form.Row>

                <Form.Row>
                    <Select
                        controlId={"formIdioma"}
                        label={"Idioma"}
                        name={"idioma"}
                        options={this.state.idiomaOptions}
                        value={""}
                        placeholder={"Elegí un idioma"}
                    />
                    <Select
                        controlId={"formPlanificacion"}
                        label={"Planificación"}
                        name={"planificacion"}
                        options={this.state.planificacionOptions}
                        value={""}
                        placeholder={"Elegí una planificación"}
                    />
                </Form.Row>
                <Form.Row>
                    <Select
                        controlId={"formDominio"}
                        label={"Dominio"}
                        name={"dominio"}
                        options={this.state.dominoOptions}
                        value={""}
                        placeholder={"Elegí un domino"}
                    />
                    <Col></Col>
                </Form.Row>
                <Form.Row>
                    <FormDominio onAddition={this.onAddition} />
                    <Col></Col>
                </Form.Row>
                <Button variant="primary" type="button" onClick={this.handleFormSubmit} >Continuar</Button>
            </Form>

        )
    }
}

export default FormActividad