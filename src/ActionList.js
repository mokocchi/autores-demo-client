import React from 'react';
import { ListGroup } from 'react-bootstrap';

function ActionList(props) {
    return (
        <ListGroup>
            {
                props.items.map((item) =>
                    <ListGroup.Item action={props.action} key={item[props.value]} onClick={(e) => { e.preventDefault(); props.onClick(item) }}>
                        {item[props.field]}
                        {props.children}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    )
}

export default ActionList;