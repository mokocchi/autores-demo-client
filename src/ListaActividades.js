import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { API_BASE_URL } from './config';

class ListaActividades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: []
        }
        this.getActividades = this.getActividades.bind(this);
        this.getActividades();
    }

    async getActividades() {
        const response = await fetch(API_BASE_URL + '/actividades');
        const data = await response.json();
        this.setState({
            actividades: data
        })
    }
    render() {
        return (
            <ul>
                {this.state.actividades.map(actividad =>
                    <Link to={'/actividad/' + actividad.id + '/mostrar'}>
                        <li>{actividad.nombre}</li>
                    </Link>
                )}
            </ul>
        )
    }
}

export default ListaActividades;