import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddTareasActionList from './TareasActionList';
import { unchooseTarea } from '../../../redux/actions';

class AddTareasActionListContainer extends Component {

    onClick = (item) => {
        this.props.dispatch(unchooseTarea(item.id));
    }

    render() {
        const clonedTareas = this.props.clonedTareas;
        let tareas = [];
        if(this.props.clone) {
            tareas = this.props.chosenTareas.map(
                (tarea, index) => {
                    return {
                        ...tarea,
                        nombre: `Reemplazando a la tarea ${clonedTareas[index].nombre}: ${tarea.nombre}`
                    }
                })
        } else {
            tareas = this.props.chosenTareas;
        }
        return <AddTareasActionList clone={this.props.clone} remainingTareas={this.props.remainingTareas} chosenTareas={tareas} onClick={this.onClick} />
    }
}

function mapStateToProps(state) {
    const { actividadTareas } = state
    const { chosenTareas } = actividadTareas;

    return {
        chosenTareas
    }
}

export default connect(mapStateToProps)(AddTareasActionListContainer);