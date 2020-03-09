import React, { Component } from 'react';
import { connect } from 'react-redux';

import tokenManager from '../../tokenManager';
import ListaActividades from './PublicList'

class ActividadPublicListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
            success: false,
            error: false,
            errorMessage: null
        }
        this.getActividades = this.getActividades.bind(this);
    }

    componentDidMount() {
        this.getActividades();
    }

    async getActividades() {
        const data = await tokenManager.getActividadesPublic();
        try {
            if (!data.error_code) {
                this.setState({
                    actividades: data.results,
                    success: true
                })
            } else {
                this.setState({
                    error: true,
                    errorMessage: "Ocurrió un error"
                })
            }
        } catch (error) {
            this.setState({
                error: true,
                errorMessage: "Ocurrió un error"
            })
        }
    }
    render() {
        return (
            <ListaActividades actividades={this.state.actividades} success={this.state.success}
                error={this.state.error} errorMessage={this.state.errorMessage} />
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(ActividadPublicListContainer);