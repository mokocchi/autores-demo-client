import React from 'react';
import { Row, Col, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import LoadSpinner from '../UI/LoadSpinner';

const FormDominio = (props) => {
    return (
        <Col>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl type="text" value={props.dominio} placeholder="Nuevo dominio" id="formNewDominio"
                        onChange={props.onChange} onKeyPress={props.onKeyPress} />
                        <InputGroup.Append>
                            {props.isLoading ?
                                <LoadSpinner />
                                :
                                <Button variant="success" disabled={props.dominio === ""} type="button" onClick={props.onClick}>
                                    Agregar
                                </Button>
                            }
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.error &&
                        <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                            {props.errorMessage}
                        </Form.Text>
                    }
                </Col>
            </Row>
        </Col>
    )
}

export default FormDominio;