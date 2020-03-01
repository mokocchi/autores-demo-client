import React from 'react';
import { Row, Col, InputGroup, FormGroup, FormControl, Form } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

import ActionList from '../../UI/ActionList';
import FormOptionContainer from './FormOptionContainer';
import FormValidElementsContainer from './FormValidElementsContainer';

const FormMultipleChoice = (props) => {
    const { elements, validElements, depositos } = props;
    return (
        <div>
            <h4>{props.title}</h4>
            {
                props.recoleccion && depositos.length === 0 ?
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
                        {props.recoleccion &&
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Plano</Form.Label>
                                        <FormControl name="images" type="file" onChange={props.onChangePlano} />
                                    </FormGroup>
                                </Col>
                            </Row>}
                        <Row>
                            <Col>
                                {props.recoleccion ?
                                    <ActionList items={elements} field={"name"} value={"code"} action={true} onClick={props.onClickElements}
                                        checkboxGroup={{
                                            items: depositos, onChange: props.onChangeChecks, label: "Depósitos",
                                            field: "nombre", value: "codigo"
                                        }} />
                                    :
                                    <ActionList items={elements} field={"name"} value={"code"} action={true} onClick={props.onClickElements} />
                                }
                            </Col>
                            <Col />
                        </Row>
                        <Row>
                            <FormOptionContainer />
                            <Col />
                        </Row>
                        <Row>
                            <Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <FormCheckLabel>
                                            <FormCheckInput type={"checkbox"} data-cy={"validCheckbox"} onChange={props.onChangeCheck} />
                                            Indicar elementos válidos
                                            </FormCheckLabel>
                                    </InputGroup>
                                </Col>
                            </Col>
                            <Col />
                        </Row>

                        {props.valid &&
                            <>
                                <Row>
                                    <Col>
                                        <ActionList dataCy={"actionListValids"} items={
                                            validElements.map(item => {
                                                return {
                                                    code: item,
                                                    name: elements.find(element => element.code === item).name
                                                }
                                            })
                                        } action={true} group={"valids"} onClick={props.onClickValids} value={"code"} field={"name"} />
                                    </Col>
                                    <Col />
                                </Row>
                                <Row>
                                    <Col>
                                        <FormValidElementsContainer />
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

export default FormMultipleChoice;