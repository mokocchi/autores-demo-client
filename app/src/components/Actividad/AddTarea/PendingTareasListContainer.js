import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class PendingTareasListContainer extends Component {
    render() {
        return (
            <ul style={{listStyle: 0, paddingLeft: 0}}>
                {this.props.remainingTareas.map(
                    (item, index) => {
                        const referenced = this.props.referencedTareas.find(tarea => item.id === tarea);
                        return (
                            <li key={index} style={{listStyleType: "none"}}>
                                {(index === 0) ? <Alert variant="warning">Reemplazando la tarea {item.orden}.{item.nombre}{referenced && <b> - Tiene que tener opciones</b>}</Alert> :
                                 <Alert variant="light">Falta remplazar la tarea {item.orden}.{item.nombre} {referenced && <b> - Tiene que tener opciones</b>}</Alert>
                                 }
                            </li>)
                    }
                )}
            </ul>
        )
    }
}

export default PendingTareasListContainer;