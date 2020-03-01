import React from 'react';
import ShowLinksList from '../UI/ShowLinksList';

const TareasPublicList = (props) => {
    return (
        props.success && <ShowLinksList uriPrefix="/tarea" items={props.tareas} />
    )
}

export default TareasPublicList;