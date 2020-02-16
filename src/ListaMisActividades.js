import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import tokenManager from './tokenManager';
import loggedIn from './loggedIn';

class ListaMisActividades extends Component {

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
    return state
}

export default loggedIn(connect(mapStateToProps)(ListaMisActividades));