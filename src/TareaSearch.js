import React, { Component } from 'react';
import { Row, Col, FormControl, InputGroup } from 'react-bootstrap';

import Input from './Input';
import SelectAPI from './SelectAPI';
import Select from './Select';

class TareaSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            criterionId: ""
        }
    }

    getCriteria() {
        return [
            { id: "1", nombre: "Por autor" },
            { id: "2", nombre: "Por nombre" },
            { id: "3", nombre: "Por dominio" }
        ];
    }

    searchBox() {
        switch (this.state.criterionId) {
            case "1":
                return (
                    <Input
                        type={"text"}
                        placeholder={"Autor"}
                        onChange={this.handleInput} />
                );
            case "2":
                return (
                    <Input
                        type={"text"}
                        placeholder={"Nombre"}
                        onChange={this.handleInput} />
                );
            case "3":
                return (
                    <SelectAPI
                        uri={'/dominios'}
                        attribute={"dominio"}
                        controlId={"formDominio"}
                        name={"dominio"}
                        defaultValue={""}
                        placeholder={"Elegí un dominio"}

                    />
                )
            default:
                return (
                    <FormControl type="text" placeholder="Elegí un criterio primero" disabled />
                );
        }
    }

    onChange = (e) => {
        this.setState({
            criterionId: e.target.value
        })
    }

    render() {
        return (
            <Row>
                <Col>
                    <Select
                        controlId={"searchCriteria"}
                        name={"searchCriteria"}
                        options={this.getCriteria()}
                        defaultValue={""}
                        value={"id"}
                        field={"nombre"}
                        placeholder={"Elegí un criterio"}
                        onChange={this.onChange} />
                </Col>
                <Col>
                    {this.searchBox()}
                </Col>
            </Row>
        )
    }
}

export default TareaSearch;