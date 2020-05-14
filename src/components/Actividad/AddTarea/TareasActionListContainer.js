import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reorder } from 'react-reorder';
import Icon from 'react-web-vector-icons';

import AddTareasActionList from './TareasActionList';
import { unchooseTarea, setChosenTareas } from '../../../redux/actions';
import { TIPO_COLLECT, TIPO_SELECT, TIPO_MULTIPLE, TIPO_CAMERA_INPUT, TIPO_TEXT_INPUT, TIPO_NUMBER_INPUT, TIPO_COUNTERS, TIPO_AUDIO_INPUT, TIPO_DEPOSIT, TIPO_SIMPLE, TIPO_GPS_INPUT } from '../../../config';

class AddTareasActionListContainer extends Component {

    onClick = (item) => {
        this.props.dispatch(unchooseTarea(item.id));
    }

    onReorder = (event, previousIndex, nextIndex) => {
        const newList = reorder(this.props.chosenTareas, previousIndex, nextIndex);
        this.props.dispatch(setChosenTareas(newList));
    }

    getIconName(tipo) {
        switch (tipo) {
            case TIPO_SIMPLE:
                return "pencil";
            case TIPO_TEXT_INPUT:
                return "font";
            case TIPO_NUMBER_INPUT:
                return "calculator";
            case TIPO_CAMERA_INPUT:
                return "camera";
                case TIPO_SELECT:
                    return "dot-circle-o";
            case TIPO_MULTIPLE:
                return "check-square-o";
            case TIPO_COUNTERS:
                return "list-ol";
            case TIPO_COLLECT:
                return "shopping-basket";
            case TIPO_DEPOSIT:
                return "qrcode";
            case TIPO_GPS_INPUT:
                return "map-marker";
            case TIPO_AUDIO_INPUT:
                return "microphone";
            default:
                break;
        }
    }

    render() {
        const clonedTareas = this.props.clonedTareas;
        let tareas = [];
        if (this.props.clone) {
            tareas = this.props.chosenTareas.map(
                (tarea, index) => {
                    return {
                        ...tarea,
                        nombre: `${tarea.nombre} (Reemplaza a la tarea ${index + 1}. ${clonedTareas[index].nombre})`
                    }
                })
        } else {
            tareas = this.props.chosenTareas.map(
                (tarea, index) => {
                    return {
                        ...tarea,
                        nombre: <span>{tarea.nombre}<br />
                        <i><Icon name={this.getIconName(tarea.tipo.codigo)} font="FontAwesome" color="black" size={"1rem"} /> {tarea.tipo.nombre}</i>
                        </span>
                    }
                }
            );
        }
        return <AddTareasActionList clone={this.props.clone} remainingTareas={this.props.remainingTareas} chosenTareas={tareas} onClick={this.onClick}
            onReorder={this.onReorder}/>
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