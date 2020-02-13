import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import tokenManager from './tokenManager';
import loggedIn from './loggedIn';

class ListaActividades extends Component {

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
        const data = await tokenManager.getActividades();
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
    return state
}

export default connect(mapStateToProps)(ListaActividades);