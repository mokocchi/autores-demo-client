import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import ActionList from './ActionList';

class ListTareas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tareas: this.props.tareas
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(id) {
        this.setState({
            tareas: this.state.tareas.filter((tarea) => tarea.id !== id)
        })
    }

    render() {
        return (
            <div>
                <ActionList items={this.state.tareas} action={true} onClick={this.onClick} />
                <Button variant="primary" type="button" onClick={this.handleFormSubmit} style={{marginTop: "1em"}}>Continuar</Button>
            </div>
        )
    }
}

export default ListTareas;