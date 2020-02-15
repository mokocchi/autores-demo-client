import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import tokenManager from './tokenManager';

class ListaTareas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tareas: [],
            success: false
        }
        this.getTareas = this.getTareas.bind(this);
    }

    componentDidMount() {
        this.getTareas();
    }

    async getTareas() {
        const data = await tokenManager.getTareasPublic();
        if (!data.errors) {
            this.setState({
                tareas: data,
                success: true
            })
        }
    }
    render() {
        return (
            <ul>
                {this.state.success && this.state.tareas.map((tarea, index) =>
                    <Link key={index} to={'/tarea/' + tarea.id + '/mostrar'}>
                        <li>{tarea.nombre}</li>
                    </Link>
                )}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(ListaTareas);