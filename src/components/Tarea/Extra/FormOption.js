import React from 'react';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';

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




