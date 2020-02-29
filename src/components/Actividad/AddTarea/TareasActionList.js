import React from 'react';
import ActionList from '../../UI/ActionList';


const AddTareasActionList = (props) => {
    return (
        <div>
            <h2>Tareas de la actividad</h2>
            <ActionList items={props.chosenTareas} action={true} onClick={props.onClick} field={"nombre"} value={"id"} />
        </div>
    )
}

export default AddTareasActionList;