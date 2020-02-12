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
import { getRandomSlug } from './utils'
import tokenManager from './tokenManager';

class FormTarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTarea: {
                nombre: '',
                consigna: '',
                tipo: '',
                dominio: '',
                codigo: getRandomSlug()
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
        const data = await tokenManager.getActividad(id);
        if (data.errors) {
            this.setState({
                error: true,
                errorMessage: data.errors
            });
            return;
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
                return {
                    elements: extra.elements
                };
            case TIPO_MULTIPLE_CHOICE:
                return {
                    elements: extra.elements,
                    validElements: extra.validElements
                };
            case TIPO_CONTADORES:
                return {
                    elements: extra.elements,
                    byScore: extra.byScore
                }
            case TIPO_RECOLECCION:
                return {
                    elements: extra.elements,
                    validElements: extra.validElements
                }
            default:
                break;
        }

    }

    async handleFormSubmit(e) {
        const { nombre, consigna, tipo, dominio, codigo } = this.state.newTarea;
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

        if (TIPOS_EXTRA.includes(tipo)) {
            if (extra.elements.length === 0) {
                this.setState({
                    errorMessage: "Faltan elementos",
                    error: true,
                    isLoading: false,
                })
                return;
            }

            if (tipo === TIPO_CONTADORES) {
                let criterionErrors = false
                extra.byScore.forEach(criterion => {
                    const settedElements = Object.keys(criterion.scores);
                    if (settedElements.length < extra.elements.length) {
                        this.setState({
                            isLoading: false,
                            error: true,
                            errorMessage: "Falta llenar valores en el criterio " + criterion.name
                        });
                        criterionErrors = true;
                        return;
                    }
                });
                if (criterionErrors) {
                    return;
                }
            }
            if (tipo === TIPO_RECOLECCION) {
                let elementErrors = false;
                extra.elements.forEach(element => {
                    if (!element.deposits || element.deposits.length === 0) {
                        this.setState({
                            isLoading: false,
                            error: true,
                            errorMessage: "Hay elementos sin depósitos: " + element.name
                        });
                        elementErrors = true;
                        return
                    }
                });
                if (elementErrors) {
                    return;
                }
            }
        }

        const data = await tokenManager.createTarea({
            "nombre": nombre,
            "consigna": consigna,
            "codigo": codigo,
            "tipo": tipo,
            "dominio": dominio
        });
        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
            return
        }

        if (TIPOS_EXTRA.includes(tipo)) {

            const processedExtra = this.processExtra(extra, tipo);

            const extraData = await tokenManager.addExtraToTarea({
                "extra": processedExtra,
            }, data.id)
            if (extraData.errors) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: extraData.errors
                });
                return
            }
        }

        const lastData = await tokenManager.getTarea(data.id);

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

    onPropsChangeMore = (value) => {
        const { newTarea } = this.state;
        newTarea.dominio = value;
        this.setState({
            newTarea: newTarea
        })
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
                        <Input controlId={"formConsigna"}
                            label={"Consigna"}
                            name={"consigna"}
                            type={"text"}
                            placeholder={"Consigna"}
                            onChange={this.handleInput} />
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <SelectAPI
                            uri={"/public/tipos-tarea"}
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
                            uri={'/public/dominios'}
                            attribute={"dominio"}
                            controlId={"formDominio"}
                            label={"Dominio"}
                            name={"dominio"}
                            defaultValue={""}
                            placeholder={"Elegí un dominio"}
                            onChange={this.handleInput}
                            onPropsChangeMore={this.onPropsChangeMore}
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