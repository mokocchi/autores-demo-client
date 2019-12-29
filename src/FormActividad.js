import React, { Component } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentActividad } from './redux/actions'

import Input from './Input';
import FormDominio from './FormDominio';
import SelectAPI from './SelectAPI';

import { API_BASE_URL } from './config';

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
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async handleFormSubmit(e) {
        const { nombre, objetivo, idioma, planificacion, dominio } = this.state.newActividad;
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });
        if (nombre === "") {
            this.setState({
                errorMessage: "Falta nombre",
                error: true,
                isLoading: false,
            })
            return;
        }
        if (objetivo === "") {
            this.setState({
                errorMessage: "Falta objetivo",
                error: true,
                isLoading: false,
            })
            return;
        }
        if (idioma === "") {
            this.setState({
                errorMessage: "Falta idioma",
                error: true,
                isLoading: false,
            })
            return;
        }
        if (dominio === "") {
            this.setState({
                errorMessage: "Falta dominio",
                error: true,
                isLoading: false,
            })
            return;
        }
        if (planificacion === "") {
            this.setState({
                errorMessage: "Falta planificación",
                error: true,
                isLoading: false,
            })
            return;
        }

        let response = await fetch(API_BASE_URL + '/actividad', {
            method: 'POST',
            body: JSON.stringify({
                "nombre": nombre,
                "objetivo": objetivo,
            })
        });
        const data = await response.json();
        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
            return
        }

        response = await fetch(API_BASE_URL + '/actividad/' + data.id + '/idioma', {
            method: 'POST',
            body: JSON.stringify({
                "idioma": idioma,
            })
        });
        const idiomaData = await response.json();
        if (idiomaData.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: idiomaData.errors
            });
            return
        }

        response = await fetch(API_BASE_URL + '/actividad/' + data.id + '/planificacion', {
            method: 'POST',
            body: JSON.stringify({
                "planificacion": planificacion,
            })
        });
        const planificacionData = await response.json();
        if (planificacionData.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: planificacionData.errors
            });
            return
        }

        response = await fetch(API_BASE_URL + '/actividad/' + data.id + '/dominio', {
            method: 'POST',
            body: JSON.stringify({
                "dominio": dominio,
            })
        });
        const dominioData = await response.json();
        if (dominioData.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: dominioData.errors
            });
            return
        }

        response = await fetch(API_BASE_URL + '/actividad/' + data.id);
        const lastData = await response.json();

        this.setState({
            success: true,
            isLoading: false,
            error: false,
            errorMessage: ''
        });
        this.props.dispatch(setCurrentActividad(lastData));
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            newActividad: {
                ...this.state.newActividad, [name]: value
            }
        });
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
                            onChange={this.handleInput} />
                    </Col>
                    <Col>
                        <Input controlId={"formObjetivo"}
                            label={"Objetivo"}
                            name={"objetivo"}
                            type={"text"}
                            placeholder={"Objetivo"}
                            onChange={this.handleInput} />
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
                            onChange={this.handleInput}
                        />
                    </Col>
                    <Col>
                        <SelectAPI
                            uri={'/planificaciones'}
                            attribute={"planificacion"}
                            controlId={"formPlanificacion"}
                            label={"Planificación"}
                            name={"planificacion"}
                            defaultValue={""}
                            placeholder={"Elegí una planificación"}
                            onChange={this.handleInput}
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
                            defaultValue={this.props.currentDominioId}
                            placeholder={"Elegí un dominio"}
                            onChange={this.handleInput}
                        />
                    </Col>
                    <Col></Col>
                </Form.Row>
                <Form.Row>
                    <FormDominio/>
                    <Col></Col>
                </Form.Row>
                {this.state.error &&
                    <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                        {this.state.errorMessage}
                    </Form.Text>
                }
                {this.state.isLoading ?
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
                    this.state.success ?
                        <Link to={"/actividad/" + this.props.currentActividad.id}>
                            <Button variant="primary" type="button" onClick={() => { }} >Continuar</Button>
                        </Link>
                        :
                        <Button variant="info" type="button" disabled={this.state.success} onClick={this.handleFormSubmit}>
                            Guardar
                        </Button>
                }
            </Form>

        )
    }
}

function mapStateToProps(state) {
    const { actividad } = state
    const { currentActividad, currentDominioId } = actividad
    return {
        currentActividad, 
        currentDominioId
    }
}

export default connect(mapStateToProps)(FormActividad);