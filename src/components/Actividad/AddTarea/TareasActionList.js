import React from 'react';
import ActionList from '../../UI/ActionList';
import Icon from 'react-web-vector-icons';
import { Alert } from 'react-bootstrap';


const AddTareasActionList = (props) => {
    return (
        <div>
            <h3>Tareas de la actividad {props.clone && `(${props.remainingTareas.length} más)`}</h3>
            {!props.clone && <Alert variant="info"><Icon name="md-information-circle-outline" font="Ionicons" color="teal" size={"1rem"} /> Hacé click y arrastrá una tarea hacia arriba o hacia abajo para reordenarla</Alert>}
            <ActionList variant="success" items={props.chosenTareas} action={true} onlyLastAction={props.clone} onClick={props.onClick} field={"nombre"} value={"id"}
            onReorder={props.onReorder} reorder={!props.clone} group={"addTareas"} /> 
        </div>
    )
}

export default AddTareasActionList;