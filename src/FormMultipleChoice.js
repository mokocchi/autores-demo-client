import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

import ActionList from './ActionList'
import FormOption from './FormOption';
import Select from './Select'

class FormMultipleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                "code": "tortuga",
                "text": "Tortuga"
            },
            {
                "code": "perro",
                "text": "Perro"
            },
            {
                "code": "sapo",
                "text": "Sapo"
            },
            {
                "code": "vibora",
                "text": "Víbora"
            },
            {
                "code": "picaflor",
                "text": "Picaflor"
            }]
        }
    }

    onClick = (item) => {
        console.log(item);
    }

    render() {

        return (
            <div>
                <h4>Opción Múltiple</h4>
                <Row>
                    <Col>
                        <Form.Text className="text-dark">
                            Click para borrar
                        </Form.Text>
                        <ActionList items={this.state.items} field={"text"} value={"code"} action={true} onClick={this.onClick} />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        <FormOption />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <Form.Check
                                type={"checkbox"}
                                label={"Indicar opciones correctas"}
                            />
                        </div>
                    </Col>
                    <Col />
                </Row>
                <InputGroup>
                    <Select
                        defaultValue={""}
                        placeholder={"Elegí una opción"}
                        options={this.state.items}
                        onChange={this.onChange}
                        value={"code"}
                        field={"text"}
                    />
                </InputGroup>
            </div>
        )
    }
}

export default FormMultipleChoice;