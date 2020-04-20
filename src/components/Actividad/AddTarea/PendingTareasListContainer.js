import React, { Component } from 'react';

class PendingTareasListContainer extends Component {
    render() {
        return (
            <ul>
                {this.props.remainingTareas.map(
                    (item, index) => {
                        const referenced = this.props.referencedTareas.find(tarea => item.id === tarea);
                        return (
                            <li key={index} style={{ fontWeight: (index === 0) ? "bold" : null, textDecoration: (index === 0) ? "underline" : null }}>
                                {(index === 0) ?
                                    "Reemplazando" :
                                    "Falta remplazar"} la tarea {item.orden}.{item.nombre}
                                {referenced && <b> - Tiene que tener opciones</b>}
                            </li>)
                    }
                )}
            </ul>
        )
    }
}

export default PendingTareasListContainer;