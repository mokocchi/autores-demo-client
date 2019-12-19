import React, { Component } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap'

import Select from './Select';
import Input from './Input';
import SelectAPI from './SelectAPI'
import { API_BASE_URL } from './config'

class BuscarTarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tareas: [{ "nombre": "Tarea1 es muy larga y vamos a ver que pasa con el select", "id": "1" }],
            selectedTask: ""
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        const tarea = this.state.tareas.find(item => item.id === this.state.selectedTask);
        this.props.onAddition(tarea);
    }

    onChange(event) {
        this.setState({
            selectedTask: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Form.Row>
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
                            url={API_BASE_URL + '/dominio'}
                            controlId={"formDominio"}
                            label={"Dominio"}
                            name={"dominio"}
                            value={""}
                            placeholder={"Elegí un dominio"}

                        />
                    </Col>
                </Form.Row>
                <Row>
                    <Col>
                        <h4>Resultados</h4>
                        <InputGroup>
                            <Select
                                value={""}
                                placeholder={"Elegí una tarea"}
                                options={this.state.tareas}
                                onChange={this.onChange}
                            />
                            <span>
                                <Button variant="success" type="button" onClick={this.onClick}>
                                    Agregar
                                </Button>
                            </span>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BuscarTarea