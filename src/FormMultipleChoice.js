import React, { Component } from 'react';
import { Row, Col, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeValidElementFromExtra, removeElementFromExtra, addDepositToElement, removeDepositFromElement, addFileToExtra } from './redux/actions'

import ActionList from './components/UI/ActionList';
import FormOption from './FormOption';
import FormValidElements from './FormValidElements';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class FormMultipleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }
    }

    handleCheck = (e) => {
        this.setState({
            valid: !this.state.valid
        })
    }

    onClickElements = (item) => {
        this.props.dispatch(removeElementFromExtra(item));
        this.props.dispatch(removeValidElementFromExtra(item.code));
    }

    onClickValids = (item) => {
        this.props.dispatch(removeValidElementFromExtra(item.code))
    }

    onChangeChecks = (e) => {
        const codes = e.target.name.split('-');
        const depositCode = codes[0];
        const elementCode = codes[1];
        if (e.target.checked) {
            this.props.dispatch(addDepositToElement(elementCode, depositCode));
        } else {
            this.props.dispatch(removeDepositFromElement(elementCode, depositCode))
        }
    }

    handlePlano = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            this.props.dispatch(addFileToExtra(window.URL.createObjectURL(file), file.type));
        }
        else {
            console.log("no files selected");
        }
    }

    render() {
        const { elements, validElements, chosenTareas } = this.props;
        const depositos = chosenTareas
            .filter(tarea => tarea.tipo.codigo === "deposit")
            .map(tarea => { return { codigo: tarea.codigo, nombre: tarea.nombre } });
        return (
            <div>
                <h4>{this.props.title}</h4>
                {
                    this.props.recoleccion && depositos.length === 0 ?
                        <>
                            <Row>
                                <Col>
                                    No hay depósitos, agregá tareas de depósito primero
                                </Col>
                            </Row>
                            <br></br>
                        </>
                        :
                        <>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Plano</Form.Label>
                                        <FormControl name="images" type="file" onChange={this.handlePlano} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.props.recoleccion ?
                                        <ActionList items={elements} field={"name"} value={"code"} action={true} onClick={this.onClickElements}
                                            checkboxGroup={{
                                                items: depositos, onChange: this.onChangeChecks, label: "Depósitos",
                                                field: "nombre", value: "codigo"
                                            }} />
                                        :
                                        <ActionList items={elements} field={"name"} value={"code"} action={true} onClick={this.onClickElements} />
                                    }
                                </Col>
                                <Col />
                            </Row>
                            <Row>
                                <FormOption />
                                <Col />
                            </Row>
                            <Row>
                                <Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <FormCheckLabel>
                                                <FormCheckInput type={"checkbox"} onChange={this.handleCheck} />
                                                Indicar elementos válidos
                                            </FormCheckLabel>
                                        </InputGroup>
                                    </Col>
                                </Col>
                                <Col />
                            </Row>

                            {this.state.valid &&
                                <>
                                    <Row>
                                        <Col>
                                            <ActionList items={
                                                validElements.map(item => {
                                                    return {
                                                        code: item,
                                                        name: elements.find(element => element.code === item).name
                                                    }
                                                })
                                            } action={true} onClick={this.onClickValids} value={"code"} field={"name"} />
                                        </Col>
                                        <Col />
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormValidElements />
                                        </Col>
                                        <Col />
                                    </Row>
                                </>
                            }
                        </>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { elements, validElements } = state.tareaExtra;
    const { chosenTareas } = state.actividadTareas;
    return {
        elements,
        validElements,
        chosenTareas
    }
}

export default connect(mapStateToProps)(FormMultipleChoice);