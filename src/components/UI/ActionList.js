import React from 'react';
import { ListGroup, Col, Form, Row, Button } from 'react-bootstrap';
import Icon from 'react-web-vector-icons';
import Reorder from 'react-reorder';

import Select from './Select'
import CheckboxGroup from './CheckboxGroup';

function ActionList(props) {
    return (
        <Reorder
            className="list-group"
            reorderId={props.group || "reorderId"}
            lock="horizontal"
            holdTouchTime={100}
            onReorder={props.onReorder}
            autoScroll={false}
            disabled={!props.reorder}
            placeholder={
                <ListGroup.Item variant="secondary">
                    <span className="no-select"><Icon name="md-arrow-forward" font="Ionicons" color="white" size={"1rem"} /></span>
                </ListGroup.Item>
            }
        >
            {
                props.items.map((item, index) =>
                    <ListGroup.Item key={(props.value ? item[props.value] : item) + (props.group ? "-" + props.group : "")}
                        id={(props.value ? item[props.value] : item) + (props.group ? "-" + props.group : "")}
                        variant={props.variant} className={props.reorder && "reorder-item"}>
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
                            <span className={"no-select"}>
                                {props.reorder &&
                                    ((index === 0) ?
                                        ((props.items.length !== 0) &&
                                            <Icon name="long-arrow-down" font="FontAwesome" color="black" size={"1rem"} />)
                                        : (index === props.items.length - 1) ?
                                            <Icon name="long-arrow-up" font="FontAwesome" color="black" size={"1rem"} />
                                            :
                                            <Icon name="arrows-v" font="FontAwesome" color="black" size={"1rem"} />)
                                }
                                {" "}
                                {props.field ? item[props.field] : item}
                            </span>
                        }
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
                        {(props.action && (props.onlyLastAction ? (index === props.items.length - 1) : true)) &&
                            < Button variant={props.action.variant || "danger"} type="button" className="float-right"
                                onClick={() => props.onClick(item, props.group)} data-cy={"quitar_" + (props.group ? props.group + "_" : "") + (item.id || item.name || item)}>
                                {props.action.label || <span><Icon name="cross" font="Entypo" color="white" size={"1rem"} /> Quitar</span>}
                            </Button>
                        }
                    </ListGroup.Item>
                )
            }
        </Reorder>
    )
}

export default ActionList;

