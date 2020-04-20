import React, { Component } from 'react';
import { TIPOS_OPCIONES } from '../../../config';

class PendingTareasListContainer extends Component {
    render() {
        return (
            <ul>
                {this.props.remainingTareas.map(
                    (item, index) =>
                        <li key={index} style={{fontWeight: (index === 0) ? "bold": null, textDecoration: (index === 0) ? "underline" : null}}>
                            {(index === 0) ? "Reemplazando" : "Falta remplazar"} la tarea {item.orden}.{item.nombre} ({TIPOS_OPCIONES.includes(item.tipo.id.toString()) ? "Tiene opciones" : "No tiene opciones"})
                        </li>)
                }
            </ul>
        )
    }
}

export default PendingTareasListContainer;