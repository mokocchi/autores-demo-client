import React, { Component } from 'react';
import { connect } from 'react-redux';

import tokenManager from '../../tokenManager';
import TareasPublicList from './PublicList';

class TareasPublicListContainer extends Component {

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
        if (!data.error_code) {
            this.setState({
                tareas: data.results,
                success: true
            })
        }
    }
    render() {
        return (
            <TareasPublicList success={this.state.success} tareas={this.state.tareas} />
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(TareasPublicListContainer);