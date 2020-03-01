import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function Input(props) {
    return (
        <div>
            {
                props.horizontal ?
                    <Form.Group as={Row} controlId={props.controlId}>
                        <Form.Label column sm={3}>
                            {props.label}
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type={props.type}
                                placeholder={props.placeholder}
                                onChange={props.onChange}
                                onKeyPress={props.onKeyPress}
                                name={props.name}
                                value={props.value}
                                disabled={props.disabled}
                                onBlur={props.onBlur}
                            />
                        </Col>
                    </Form.Group>
                    :
                    <Form.Group controlId={props.controlId}>
                        { props.label &&
                            <Form.Label>{props.label}</Form.Label>
                        }
                        <Form.Control type={props.type}
                            placeholder={props.placeholder}
                            onChange={props.onChange}
                            onKeyPress={props.onKeyPress}
                            name={props.name}
                            value={props.value}
                            disabled={props.disabled}
                            onBlur={props.onBlur}
                        //className="form-input"
                        />
                    </Form.Group>
            }
        </div>
    )
}

export default Input;