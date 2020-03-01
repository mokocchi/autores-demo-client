import React, { Component } from 'react';
import { connect } from 'react-redux';

import tokenManager from '../../tokenManager';
import loggedIn from '../../loggedIn';
import ListaMisTareas from './ListUser';

class TareaListUserContainer extends Component {

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
        const data = await tokenManager.getMisTareas();
        if (!data.error_code) {
            this.setState({
                tareas: data.results,
                success: true
            })
        }
    }
    render() {
        return (
            <ListaMisTareas success={this.state.success} tareas={this.state.tareas} />
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default loggedIn(connect(mapStateToProps)(TareaListUserContainer));