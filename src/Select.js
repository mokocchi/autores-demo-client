import React from 'react';
import { Form } from 'react-bootstrap'

function Select(props) {
    return (
        <Form.Group controlId={props.controlId}>
            {props.label && <Form.Label>{props.label}</Form.Label>}
            <Form.Control defaultValue={props.defaultValue} as="select" name={props.name} onChange={props.onChange} disabled={props.disabled}>
                {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
                {props.options.map((item, index) =>
                    <option value={props.value ? item[props.value] : item} key={index}>{props.field ? item[props.field] : item}</option>
                )}
            </Form.Control>
        </Form.Group>
    )
}

export default Select