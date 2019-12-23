import React from 'react';
import { ListGroup, Col, Form, Row, Button } from 'react-bootstrap';

function ActionList(props) {
    return (
        <ListGroup>
            {
                props.items.map((item) =>
                    <ListGroup.Item key={props.value ? item[props.value] : item}>
                        {props.input ?
                            <Form.Group as={Row} controlId={(props.value ? item[props.value] : item) + "FormHorizontal"}>
                                <Form.Label column sm={3}>
                                    {props.field ? item[props.field] : item}
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type={props.input.type} placeholder={props.input.placeholder}
                                        onChange={props.input.onChange} name={props.value ? item[props.value] : item} />
                                </Col>
                            </Form.Group>
                            :
                            props.field ? item[props.field] : item
                        }
                        {props.action &&
                            < Button variant="danger" type="button" className="float-right" onClick={() => props.onClick(item)}>
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

