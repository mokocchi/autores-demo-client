import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

import ActionList from './ActionList'
import FormOption from './FormOption';

class FormElegirOpcion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                "code": "01",
                "text": "Animales"
            },
            {
                "code": "02",
                "text": "Informática"
            }]
        }
    }

    onClick = (item) => {
        console.log(item);
    }

    render() {

        return (
            <div>
                <h4>Elegir una opción</h4>
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
            </div>
        )
    }
}

export default FormElegirOpcion;