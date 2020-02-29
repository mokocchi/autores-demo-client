import React, { Component } from 'react';
import { connect } from 'react-redux';

import tokenManager from '../../tokenManager';
import ListaActividades from './PublicList'

class ActividadPublicListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
            success: false
        }
        this.getActividades = this.getActividades.bind(this);
    }

    componentDidMount() {
        this.getActividades();
    }

    async getActividades() {
        const data = await tokenManager.getActividadesPublic();
        if (!data.error_code) {
            this.setState({
                actividades: data.results,
                success: true
            })
        }
    }
    render() {
        return (
            <ListaActividades actividades={this.state.actividades} success={this.state.success} />
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(ActividadPublicListContainer);