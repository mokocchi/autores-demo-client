import React from 'react';
import ActionList from '../../UI/ActionList';


const AddTareasActionList = (props) => {
    return (
        <div>
            <h3>Tareas de la actividad {props.clone && `(${props.remainingTareas.length} más)`}</h3>
            <ActionList items={props.chosenTareas} action={true} onlyLastAction onClick={props.onClick} field={"nombre"} value={"id"} />
        </div>
    )
}

export default AddTareasActionList;