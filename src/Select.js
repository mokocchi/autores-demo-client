import React, { Component } from 'react';
import { Form } from 'react-bootstrap'

class Select extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsCache: this.props.options,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.optionsCache.length > nextProps.options.length) {
            if(nextProps.onPropsChangeLess){
                nextProps.onPropsChangeLess();
            }
            return {
                optionsCache: nextProps.options
            }
        } else {
            return null
        }
    }

    render() {
        const { props } = this;
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
}

export default Select