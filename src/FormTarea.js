import React, { Component } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTarea, setCurrentActividad, clearTareaExtra } from './redux/actions';

import Input from './Input';
import SelectAPI from './SelectAPI';
import FormDominio from './FormDominio';
import TareaExtra from './TareaExtra';

import { API_BASE_URL, TIPOS_EXTRA, TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION } from './config';

class FormTarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTarea: {
                nombre: '',
                consigna: '',
                tipo: '',
                dominio: ''
            },
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        let id = this.props.actividadId;
        this.setCurrentActividad(id);
        this.props.dispatch(clearTareaExtra())
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async setCurrentActividad(id) {
        const response = await fetch(API_BASE_URL + '/actividad/' + id);
        const data = await response.json();
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors
            });
        }
        this.props.dispatch(setCurrentActividad(data));
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    processExtra(extra, tipo) {
        switch (tipo) {
            case TIPO_SELECCION:
                delete extra.correctAnswers
                return extra;
            case TIPO_MULTIPLE_CHOICE:
                return extra;
            default:
                break;
        }

    }

    async handleFormSubmit(e) {
        const { nombre, consigna, tipo, dominio } = this.state.newTarea;
        const { extra } = this.props;
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
        if (consigna === "") {
            this.setState({
                errorMessage: "Falta consigna",
                error: true,
                isLoading: false,
            })
            return;
        }
        if (tipo === "") {
            this.setState({
                errorMessage: "Falta tipo",
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

        if (TIPOS_EXTRA.includes(tipo) && this.isEmpty(extra)) {
            this.setState({
                errorMessage: "Faltan datos extra",
                error: true,
                isLoading: false,
            })
            return;
        }

        let response = await fetch(API_BASE_URL + '/tarea', {
            method: 'POST',
            body: JSON.stringify({
                "nombre": nombre,
                "consigna": consigna,
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

        response = await fetch(API_BASE_URL + '/tarea/' + data.id + '/tipo-tarea', {
            method: 'POST',
            body: JSON.stringify({
                "tipo-tarea": tipo,
            })
        });
        const tipoData = await response.json();
        if (tipoData.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: tipoData.errors
            });
            return
        }

        response = await fetch(API_BASE_URL + '/tarea/' + data.id + '/dominio', {
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

        if (TIPOS_EXTRA.includes(tipo)) {

            const processedExtra = this.processExtra(extra, tipo);

            response = await fetch(API_BASE_URL + '/tarea/' + data.id + '/extra', {
                method: 'POST',
                body: JSON.stringify({
                    "extra": processedExtra,
                })
            });
            const extraData = await response.json();
            if (extraData.errors) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: extraData.errors
                });
                return
            }
        }

        response = await fetch(API_BASE_URL + '/tarea/' + data.id);
        const lastData = await response.json();

        this.props.dispatch(addTarea(lastData));

        this.setState({
            success: true,
            isLoading: false,
            error: false,
            errorMessage: ''
        });
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            newTarea: {
                ...this.state.newTarea, [name]: value
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
                            handleChange={this.handleInput} />
                    </Col>
                    <Col>
                        <Input controlId={"formConsigna"}
                            label={"Consigna"}
                            name={"consigna"}
                            type={"text"}
                            placeholder={"Consigna"}
                            handleChange={this.handleInput} />
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <SelectAPI
                            uri={"/tipo-tarea"}
                            attribute={"tipo"}
                            controlId={"formTipo"}
                            label={"Tipo"}
                            name={"tipo"}
                            defaultValue={""}
                            placeholder={"Elegí un tipo"}
                            onChange={this.handleInput}
                        />
                    </Col>
                    <Col>
                        <SelectAPI
                            uri={'/dominio'}
                            attribute={"dominio"}
                            controlId={"formDominio"}
                            label={"Dominio"}
                            name={"dominio"}
                            defaultValue={""}
                            placeholder={"Elegí un dominio"}
                            onChange={this.handleInput}
                        />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col></Col>
                    <FormDominio />
                </Form.Row>

                <hr />

                <TareaExtra tipoTarea={this.state.newTarea.tipo} />

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
                            <Button variant="primary" type="button" >Continuar</Button>
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
    const { currentActividad } = state.actividad;
    const extra = state.tareaExtra;
    return {
        currentActividad,
        extra
    }
}

export default connect(mapStateToProps)(FormTarea);