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
        const token = this.props.token;
        if (expired(token.expiresAt)) {
            const token = tokenManager.fetchApiUser(this.props.user.id_token);
            if (!token) {
                this.props.dispatch(userSignedOut());
            } else {
                this.props.dispatch(apiUserFound(token));
                tokenManager.storeApiUser(token);
            }
        }

        const response = await fetch(API_BASE_URL + '/actividades', {
            headers: {
                "Authorization": "Bearer " + token.accessToken
            }
        });
        const data = await response.json();
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