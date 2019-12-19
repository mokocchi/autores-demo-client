import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap'

import Select from './Select';
import Input from './Input';
import FormDominio from './FormDominio';
import SelectAPI from './SelectAPI'
import { API_BASE_URL } from './config'

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
            dominios: null
        }
        this.onAddition = this.onAddition.bind(this);
        this.onDominiosLoad = this.onDominiosLoad.bind(this);
    }

    onAddition(dominio) {
        this.state.dominios ?
            this.setState({
                dominios: [...this.state.dominios, dominio]
            }) : this.setState({
                dominios: [dominio]
            })
    }

    onDominiosLoad(data) {
        this.setState({
            dominios: data
        })
    }

    handleFormSubmit = () => {

    }

    handleInput = () => {

    }


    render() {
        return (
            <Form>
                <Form.Row>
                    <Col>
                        <Input controlId={"formNombre"}
                            label={"Nombre"}
                            name={"nombre"}
                            type={"text"}
                            placeholder={"Nombre"}
                            handleChange={this.handleInput} />
                    </Col>
                    <Col>
                        <Input controlId={"formObjetivo"}
                            label={"Objetivo"}
                            name={"objetivo"}
                            type={"text"}
                            placeholder={"Objetivo"}
                            handleChange={this.handleInput} />
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <SelectAPI
                            url={API_BASE_URL + "/idioma"}
                            controlId={"formIdioma"}
                            label={"Idioma"}
                            name={"idioma"}
                            value={""}
                            placeholder={"Elegí un idioma"}
                        />
                    </Col>
                    <Col>
                        <SelectAPI
                            url={API_BASE_URL + '/planificacion'}
                            controlId={"formPlanificacion"}
                            label={"Planificación"}
                            name={"planificacion"}
                            value={""}
                            placeholder={"Elegí una planificación"}
                        />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        {this.state.dominios ?
                            <Select
                                controlId={"formDominio"}
                                label={"Dominio"}
                                name={"dominio"}
                                options={this.state.dominios}
                                value={""}
                                placeholder={"Elegí un dominio"}
                            />
                            : <SelectAPI
                                url={API_BASE_URL + '/dominio'}
                                controlId={"formDominio"}
                                label={"Dominio"}
                                name={"dominio"}
                                value={""}
                                placeholder={"Elegí un dominio"}
                                onLoad={this.onDominiosLoad}
                            />}
                    </Col>
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