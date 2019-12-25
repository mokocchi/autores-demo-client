import React from 'react';
import { ListGroup, Col, Form, Row, Button } from 'react-bootstrap';

import Select from './Select'
import CheckboxGroup from './CheckboxGroup';

function ActionList(props) {
    return (
        <ListGroup>
            {
                props.items.map((item) =>
                    <ListGroup.Item key={(props.value ? item[props.value] : item) + (props.group ? "-" + props.group : "")}>
                        {props.input ?
                            <Form.Group as={Row} controlId={(props.value ? item[props.value] : item) + (props.group ? "-" + props.group : "")}>
                                <Form.Label column sm={3}>
                                    {props.field ? item[props.field] : item}
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type={props.input.type} placeholder={props.input.placeholder}
                                        onChange={props.input.onChange} name={(props.value ? item[props.value] : item) + (props.group ? "-" + props.group : "")}
                                    />
                                </Col>
                            </Form.Group>
                            :
                            props.field ? item[props.field] : item}
                        {
                            props.select &&
                            <Select options={props.select.options} field={props.select.field}
                                placeholder={props.select.placeholder} defaultValue={props.select.defaultValue}
                                name={(props.value ? item[props.value] : item)} onChange={props.select.onChange}
                            />
                        }
                        {
                            props.checkboxGroup &&
                            <CheckboxGroup items={props.checkboxGroup.items} onChange={props.checkboxGroup.onChange}
                                field={props.checkboxGroup.field} value={props.checkboxGroup.value} label={props.checkboxGroup.label} group={(props.value ? item[props.value] : item)} />
                        }
                        {props.action &&
                            < Button variant="danger" type="button" className="float-right"
                                onClick={() => props.onClick(item, props.group)}>
                                Quitar
                            </Button>
                        }
                    </ListGroup.Item>
                )
            }
        </ListGroup >
    )
}

export default ActionList;

