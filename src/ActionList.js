import React from 'react';
import { ListGroup } from 'react-bootstrap';

function ActionList(props) {
    return (
        <ListGroup>
            {
                props.items.map((item) =>
                    <ListGroup.Item action={props.action} key={props.value? item[props.value] : item} onClick={(e) => { e.preventDefault(); props.onClick(item) }}>
                        {props.field ? item[props.field] : item}
                        {props.children}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    )
}

export default ActionList;