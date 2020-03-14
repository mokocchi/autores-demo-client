import React, { Component } from 'react';

class PendingTareasListContainer extends Component {
    render() {
        return (
            <ul>
                {this.props.remainingTareas.map(
                    (item, index) => <li key={index}>Reemplazar la tarea "{item.nombre}"</li>)
                }
            </ul>
        )
    }
}

export default PendingTareasListContainer;