import React from 'react';
import { Form, Col } from 'react-bootstrap';

function Input(props) {
    return (
        <Form.Group as={Col} controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type}
                placeholder={props.placeholder}
                onChange={props.handleChange}
                //className="form-input"
                id={props.name}
                name={props.name} />
        </Form.Group>
    )
}

export default Input;