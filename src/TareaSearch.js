import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import Input from './Input';
import SelectAPI from './SelectAPI';

class TareaSearch extends Component {
    render() {
        return (
            <Form.Row className="align-items-center">
                <Col>
                    <Input
                        label={"Por Autor"}
                        type={"text"}
                        placeholder={"Autor"}
                        handleChange={this.handleInput} />
                </Col>
                <Col>
                    <Input
                        label={"Por nombre"}
                        type={"text"}
                        placeholder={"Nombre"}
                        handleChange={this.handleInput} />
                </Col>
                <Col>
                    <SelectAPI
                        uri={'/dominio'}
                        attribute={"dominio"}
                        controlId={"formDominio"}
                        label={"Dominio"}
                        name={"dominio"}
                        value={""}
                        placeholder={"Elegí un dominio"}

                    />
                </Col>
            </Form.Row>
        )
    }
}

export default TareaSearch;