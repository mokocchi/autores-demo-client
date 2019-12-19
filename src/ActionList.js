import React from 'react';
import { ListGroup } from 'react-bootstrap';

function ActionList(props) {
    return (
        <ListGroup>
            {
                props.items.map((item) =>
                    <ListGroup.Item action={props.action} key={item.id} onClick={() => props.onClick(item.id)}>{item.nombre}</ListGroup.Item>
                )
            }
        </ListGroup>
    )
}

export default ActionList;