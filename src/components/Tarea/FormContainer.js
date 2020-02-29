import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTarea, setCurrentActividad, clearTareaExtra } from '../../redux/actions';

import { TIPOS_EXTRA, TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION, TIPOS_PLANO } from '../../config';
import { getRandomSlug } from '../../utils'
import tokenManager from '../../tokenManager';
import TareaForm from './Form';

class FormTareaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTarea: {
                nombre: '',
                consigna: '',
                tipo: '',
                dominio: '',
                codigo: getRandomSlug(),
                estado: ''
            },
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        let id = this.props.actividadId;
        if (id) {
            this.setCurrentActividad(id);
        }
        this.props.dispatch(clearTareaExtra())
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async setCurrentActividad(id) {
        const data = await tokenManager.getActividad(id);
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message
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
        const { nombre, consigna, tipo, dominio, codigo, estado } = this.state.newTarea;
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
        if (estado === "") {
            this.setState({
                errorMessage: "Falta estado",
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
                if (!extra.plano) {
                    elementErrors = true;
                }
                if (elementErrors) {
                    return;
                }
            }
        }

        let processedExtra = null;
        if (TIPOS_EXTRA.includes(tipo)) {
            processedExtra = this.processExtra(extra, tipo);
        }

        const tarea = await tokenManager.createTarea({
            "nombre": nombre,
            "consigna": consigna,
            "codigo": codigo,
            "tipo": tipo,
            "dominio": dominio,
            "estado": estado,
            "extraData": processedExtra
        });
        if (tarea.error_code) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: tarea.user_message
            });
            return
        }

        const id = tarea.id;

        if (TIPOS_PLANO.includes(tipo)) {
            const response = await fetch(extra.plano.url);
            const blob = await response.blob();
            const plano = new File([blob], codigo + '.png', { type: extra.plano.filetype });
            const formData = new FormData();
            formData.append('plano', plano);
            const planoData = await tokenManager.addPlanoToTarea(formData, id);
            if (planoData.error_code) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: planoData.user_message
                });
                return;
            }
        }

        this.props.dispatch(addTarea(tarea));

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
        if (name === "tipo") {
            this.props.dispatch(clearTareaExtra())
        }
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
            <TareaForm onChange={this.handleInput} onPropsChangeMore={this.onPropsChangeMore}
                tipoTarea={this.state.newTarea.tipo} error={this.state.error} errorMessage={this.state.errorMessage}
                isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.currentActividad.id}
                onSubmit={this.handleFormSubmit}
            />
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

export default connect(mapStateToProps)(FormTareaContainer);