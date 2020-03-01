import React from 'react';
import ShowLinksList from '../UI/ShowLinksList';
import { Container, Row, Col } from 'react-bootstrap';

const TareaListUser = (props) => {
    return (
        props.success && <ShowLinksList uriPrefix="/tarea" items={props.tareas} />
    )
}

export default TareaListUser;