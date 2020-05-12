import React, { Component } from 'react';
import tokenManager from '../../../tokenManager';
import ResultsTable from './Table';

class ResultsTableContainer extends Component {
    state = {
        columns: [],
        rows: [],
        loading: true,
        error: null
    }

    async loadResults(id) {
        const data = await tokenManager.getResults(id);
        if (data.error_code) {
            this.setState({
                loading: false,
                error: data.user_message
            });
        } else {
            this.setState({
                loading: false,
                columns: data.tareas,
                rows: data.respuestas
            })
        }
    }

    componentDidMount() {
        this.loadResults(this.props.actividadCode);
    }

    render() {
        return (
            <ResultsTable data={{ rows: this.state.rows, columns: this.state.columns }} loading={this.state.loading} error={this.state.error} />
        )
    }
}

export default ResultsTableContainer;