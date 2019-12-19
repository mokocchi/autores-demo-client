import React from 'react';
import { Form, Col } from 'react-bootstrap'

function Select(props) {
    return (
        <Form.Group as={Col} controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control value={props.value} as="select" name={props.name}>
            <option value="" disabled>{props.placeholder}</option>
                {props.options.map((item, index) =>
                    <option value={item.id} key={index}>{item.nombre}</option>
                )}
            </Form.Control>
        </Form.Group>
    )
}

export default Select