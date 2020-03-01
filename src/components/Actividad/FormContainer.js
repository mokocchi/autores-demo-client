import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCurrentActividad } from '../../redux/actions'

import tokenManager from '../../tokenManager';
import { getRandomSlug } from '../../utils';

import ActividadForm from './Form';

class ActividadFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newActividad: {
                nombre: '',
                objetivo: '',
                idioma: '',
                tipoPlanificacion: '',
                dominio: '',
                estado: '',
                codigo: getRandomSlug()
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
        const { nombre, objetivo, idioma, tipoPlanificacion, dominio, estado, codigo } = this.state.newActividad;
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
        if (tipoPlanificacion === "") {
            this.setState({
                errorMessage: "Falta planificación",
                error: true,
                isLoading: false,
            })
            return;
        }

        if (estado === "") {
            this.setState({
                errorMessage: "Falta estado",
                error: true,
                isLoading: false
            })
        }

        const actividad = await tokenManager.createActividad({
            "nombre": nombre,
            "objetivo": objetivo,
            "codigo": codigo,
            "dominio": dominio,
            "idioma": idioma,
            "tipoPlanificacion": tipoPlanificacion,
            "estado": estado
        })
        if (actividad.error_code) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: actividad.user_message
            });
            return
        }

        this.setState({
            success: true,
            isLoading: false,
            error: false,
            errorMessage: ''
        });
        this.props.dispatch(setCurrentActividad(actividad));
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

    onPropsChangeMore = (value) => {
        const { newActividad } = this.state;
        newActividad.dominio = value;
        this.setState({
            newActividad: newActividad
        })
    }

    render() {
        return (
            <ActividadForm onChange={this.handleInput} dominioDefaultValue={this.props.currentDominioId}
                onPropsChangeMore={this.onPropsChangeMore} error={this.state.error} errorMessage={this.state.errorMessage}
                isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.currentActividad.id}
                onSubmit={this.handleFormSubmit}
            />
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

export default connect(mapStateToProps)(ActividadFormContainer);