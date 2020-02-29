import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';

import Input from '../../Input';
import Select from '../UI/Select';
import SelectAPI from '../UI/SelectAPI';

function getCriteria() {
    return [
        { id: "1", nombre: "Por autor" },
        { id: "2", nombre: "Por nombre" },
        { id: "3", nombre: "Por dominio" }
    ];
}

function searchBox(criterionId) {
    switch (criterionId) {
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

const TareaSearch = (props) => {
    return (
        <div>
            <h2>Buscar Tarea</h2>
            <Row>
                <Col>
                    <Select
                        controlId={"searchCriteria"}
                        name={"searchCriteria"}
                        options={getCriteria()}
                        defaultValue={""}
                        value={"id"}
                        field={"nombre"}
                        placeholder={"Elegí un criterio"}
                        onChange={props.onChange} />
                </Col>
                <Col>
                    {searchBox(props.criterionId)}
                </Col>
            </Row>
        </div>
    )
}

export default TareaSearch;