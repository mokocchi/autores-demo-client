import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

import FormOption from './FormOption';
import FormContador from './FormContador';
import ActionList from './ActionList';

class FormContadores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                "code": "perro",
                "text": "Perro"
            },
            {
                "code": "gato",
                "text": "Gato"
            },
            {
                "code": "pajaro",
                "text": "Pájaro"
            },
            {
                "code": "lagartija",
                "text": "Lagartija"
            }]
        }
    }

    onClick = (item) => {
        console.log(item);
    }

    render() {

        return (
            <div>
                <h3>Contadores</h3>
                <h4>Rareza</h4>
                <i>Cuanto más alto el número, más raro el animal</i>
                <Row>
                    <Col>
                        <Form.Text className="text-dark">
                            Click para borrar
                        </Form.Text>

                        <ActionList items={["uno"]} action onClick={this.onClick}>
                            <Form.Group as={Row} controlId="formHorizontalPerro">
                                <Form.Label column sm={3}>
                                    Perro
                            </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="number" placeholder="10" />
                                </Col>
                            </Form.Group>
                        </ActionList>
                        <FormOption />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        <FormContador />
                    </Col>
                    <Col />
                </Row>
            </div>
        )
    }
}

export default FormContadores;