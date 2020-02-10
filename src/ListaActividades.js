import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { API_BASE_URL } from './config';
import { expired } from './utils';
import tokenManager from './tokenManager';
import { userSignedOut } from 'redux-oidc';
import { apiUserFound } from './redux/actions';
import loggedIn from './loggedIn';

class ListaActividades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
            success: false
        }
        this.getActividades = this.getActividades.bind(this);
        this.getActividades();
    }

    async getActividades() {
        const data = tokenManager.client.getActividades();
        if (!data.errors) {
            this.setState({
                actividades: data,
                success: true
            })
        }
    }
    render() {
        return (
            <ul>
                {this.state.success && this.state.actividades.map((actividad, index) =>
                    <Link key={index} to={'/actividad/' + actividad.id + '/mostrar'}>
                        <li>{actividad.nombre}</li>
                    </Link>
                )}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}

export default loggedIn(connect(mapStateToProps)(ListaActividades));