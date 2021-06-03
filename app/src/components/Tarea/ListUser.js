import React from 'react';
import ShowLinksList from '../UI/ShowLinksList';

const TareaListUser = (props) => {
    return (
        props.success ? <ShowLinksList uriPrefix="/tarea" items={props.tareas} /> : <p>Cargando...</p>
    )
}

export default TareaListUser;