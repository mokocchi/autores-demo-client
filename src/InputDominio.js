import React, { Component } from 'react';
import { Col, Form } from 'react-bootstrap'

import FormDominio from './FormDominio'
import Select from './Select'

class InputDominio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dominios: null,
        };
        this.onAddition = this.onAddition.bind(this);
    }

    onAddition(dominio) {
        if (this.state.dominios) {
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
                
            </div>
        )
    }
}

export default InputDominio