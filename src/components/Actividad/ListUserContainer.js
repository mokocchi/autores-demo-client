import React, { Component } from 'react';
import { connect } from 'react-redux';

import tokenManager from '../../tokenManager';
import loggedIn from '../../loggedIn';
import ListaMisActividades from './ListUser';

class ActividadListUserContainer extends Component {

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
        const data = await tokenManager.getMisActividades();
        if (!data.error_code) {
            this.setState({
                actividades: data.results,
                success: true
            })
        }
    }
    render() {
        return (
            <ListaMisActividades success={this.state.success} actividades={this.state.actividades}/>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default loggedIn(connect(mapStateToProps)(ActividadListUserContainer));