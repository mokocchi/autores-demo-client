import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

import ActionList from './ActionList'
import FormOption from './FormOption';
import Select from './Select'

class FormRecoleccion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                "name": "Monitor",
                "code": "monitor_t2",
                "deposits": [
                    "otros"
                ]
            },
            {
                "name": "Cañon o Proyector",
                "code": "cañon o proyector_t2",
                "deposits": [
                    "otros"
                ]
            },
            {
                "name": "Impresora",
                "code": "impresora_t2",
                "deposits": [
                    "otros"
                ]
            },
            {
                "name": "Reproductor de DVD",
                "code": "reproductor de DVD_t2",
                "deposits": [
                    "otros"
                ]
            },
            {
                "name": "Tablet",
                "code": "tablet_t2",
                "deposits": [
                    "ebasura"
                ]
            },
            {
                "name": "Notebook",
                "code": "notebook_t2",
                "deposits": [
                    "ebasura"
                ]
            }]
        }
    }

    onClick = (item) => {
        console.log(item);
    }

    render() {

        return (
            <div>
                <h4>Recolección</h4>
                <Row>
                    <Col>
                        <ActionList items={this.state.items} field={"name"} value={"code"} action={true} onClick={this.onClick}>
                            <Select options={[{ name: "uno" }, { name: "dos" }]} field={"name"} placeholder="Elegí un depósito" defaultValue={""} />
                        </ActionList>
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
                        field={"name"}
                    />
                    <span>
                        <Button variant="success" type="button" onClick={this.onClick}
                        // disabled={selectedTareaId === ""}
                        >
                            Agregar
                        </Button>
                    </span>
                </InputGroup>
            </div>
        )
    }
}

export default FormRecoleccion;