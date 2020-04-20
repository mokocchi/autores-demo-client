import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTarea, setCurrentActividad, clearTareaExtra } from '../../redux/actions';

import { TIPOS_EXTRA, TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION, TIPOS_PLANO } from '../../config';
import tokenManager from '../../tokenManager';
import TareaForm from './Form';

class FormTareaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tarea: null,
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

    async handleFormSubmit(values) {
        const { nombre, consigna, tipo, dominio, codigo, estado } = values;
        const { extra } = this.props;
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

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
        
        if (TIPOS_PLANO.includes(tipo)) {
            if(!extra.plano || !extra.plano.url) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: "Falta imagen para el plano"
                });
                return
            }
        }

        let processedExtra = null;
        if (TIPOS_EXTRA.includes(tipo)) {
            processedExtra = this.processExtra(extra, tipo);
        }

        let tarea = this.state.tarea;
        if(!tarea) {
            const tareaData = await tokenManager.createTarea({
                "nombre": nombre,
                "consigna": consigna,
                "codigo": codigo,
                "tipo": tipo,
                "dominio": dominio,
                "estado": estado,
                "extraData": processedExtra
            });
            if (tareaData.error_code) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: tareaData.user_message
                });
                return
            }

            this.setState({
                tarea: tareaData
            });
            tarea = tareaData;
        }

        if (TIPOS_PLANO.includes(tipo)) {
            const response = await fetch(extra.plano.url);
            const blob = await response.blob();
            const plano = new File([blob], codigo + '.png', { type: extra.plano.filetype });
            const formData = new FormData();
            formData.append('plano', plano);
            const planoData = await tokenManager.addPlanoToTarea(formData, tarea.id);
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
                error={this.state.error} errorMessage={this.state.errorMessage}
                isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.currentActividad.id}
                onSubmit={this.handleFormSubmit} clone={this.props.clone}
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