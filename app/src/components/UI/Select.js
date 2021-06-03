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
        if (prevState.optionsCache.length > nextProps.options.length) {
            if (nextProps.onPropsChangeLess) {
                nextProps.onPropsChangeLess();
                document.querySelector("#" + nextProps.controlId).value = "";
            }
            return {
                optionsCache: nextProps.options
            }
        }
        if (prevState.optionsCache.length < nextProps.options.length) {
            if (nextProps.onPropsChangeMore) {
                let value = 0
                if(nextProps.value) {
                    value = nextProps.options[nextProps.options.length - 1][nextProps.value];
                } else {
                   value = nextProps.options[nextProps.options.length - 1];
                }
                document.querySelector("#" + nextProps.controlId).value = value;
                nextProps.onPropsChangeMore(value);
            }
            return {
                optionsCache: nextProps.options
            }
        }
        return null
    }


    render() {
        const { props } = this;
        return (
            <Form.Group controlId={props.controlId}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <Form.Control data-cy={props.dataCy} defaultValue={props.defaultValue} as="select" name={props.name} onChange={props.onChange} disabled={props.disabled}
                onBlur={props.onBlur}>
                    {props.placeholder && <option value="" disabled>{props.error? "No se pudo obtener los elementos" : props.placeholder}</option>}
                    {!props.error && props.options.map((item, index) =>
                        <option value={props.value ? item[props.value] : item} key={index}>{props.field ? item[props.field] : item}</option>
                    )}
                </Form.Control>
            </Form.Group>
        )
    }
}

export default Select