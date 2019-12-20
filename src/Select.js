import React from 'react';
import { Form } from 'react-bootstrap'

function Select(props) {
    return (
        <Form.Group controlId={props.controlId}>
            { props.label && <Form.Label>{props.label}</Form.Label>}
            <Form.Control defaultValue={props.defaultValue} as="select" name={props.name} onChange={props.onChange}>
            <option value="" disabled>{props.placeholder}</option>
                {props.options.map((item, index) =>
                    <option value={item.id} key={index}>{item.nombre}</option>
                )}
            </Form.Control>
        </Form.Group>
    )
}

export default Select