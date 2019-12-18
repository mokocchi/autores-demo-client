import React, { Component } from 'react';
import { Col, Form } from 'react-bootstrap'

import FormDominio from './FormDominio'
import SelectElements from './SelectElements'

class InputDominio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dominios: null,
        };
        this.onAddition = this.onAddition.bind(this);
    }

    onAddition(dominio) {
        if(this.state.dominios) {
            this.setState({
                dominios: [...this.state.dominios, dominio]
            })
        } else {
            this.setState({
                dominios: [dominio]
            })
        }
    }

    render() {
        return (
            <div>
                <Form.Row>
                    <SelectElements url={this.props.url} label={"Dominio"} controlId={"formDominio"} />
                    <Col></Col>
                </Form.Row>
                <Form.Row>
                    <FormDominio onAddition={this.onAddition} />
                    <Col></Col>
                </Form.Row>
            </div>
        )
    }
}

export default InputDominio