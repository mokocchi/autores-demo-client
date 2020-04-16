import React, { Component } from 'react';
import { TIPOS_OPCIONES } from '../../../config';

class PendingTareasListContainer extends Component {
    render() {
        return (
            <ul>
                {this.props.remainingTareas.map(
                    (item, index) =>
                        <li key={index}>
                            {index === 0 && "▶▶▶"}
                            Reemplazar la tarea "{item.nombre}" ({TIPOS_OPCIONES.includes(item.tipo.id) ? "Tiene opciones" : "No tiene opciones"})
                            {index === 0 && "◀◀◀"}
                        </li>)
                }
            </ul>
        )
    }
}

export default PendingTareasListContainer;