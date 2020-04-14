import React, { Component } from 'react';
import { TIPOS_OPCIONES } from '../../../config';

class PendingTareasListContainer extends Component {
    render() {
        return (
            <ul>
                {this.props.remainingTareas.map(
                    (item, index) =>
                        <li key={index}>
                            Reemplazar la tarea "{item.nombre}" ({TIPOS_OPCIONES.includes(item.tipo.id) ? "Tiene opciones" : "No tiene opciones"})
                        </li>)
                }
            </ul>
        )
    }
}

export default PendingTareasListContainer;