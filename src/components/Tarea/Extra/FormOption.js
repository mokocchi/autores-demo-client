import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addElementToExtra } from '../../../redux/actions';

import { getRandomSlug } from '../../../utils'

const FormOption = (props) => {
    return (
        <Col>
            <Row>
                <Col>
                    Elementos
                        <InputGroup className="mb-3">
                        <FormControl type="text" value={props.elementName} placeholder="Nuevo elemento" onChange={props.onChange} onKeyPress={props.onKeyPress} />
                        <InputGroup.Append>
                            <Button variant="success" disabled={props.elementName === ""} type="button" onClick={props.onClick}>
                                Agregar
                                    </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        </Col>
    )
}

export default FormOption;




