import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { InputGroupButton } from 'react-bootstrap';

class FormDominio extends Component {
    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Nuevo dominio" />
                <span class="input-group-btn">
                    <Button variant="success" type="button">Agregar</Button>
                </span>
                </InputGroup>
            </div>
        )
    }
}

export default FormDominio




