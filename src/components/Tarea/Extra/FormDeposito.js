import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const FormDeposito = (props) => {
        return (
            <div>
                <h4>Depósito</h4>
                <Row>
                    <Col>
                        <FormGroup>
                            <Form.Label>Plano</Form.Label>
                            <FormControl name="images" type="file" onChange={props.handlePlano} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        )
}

export default FormDeposito;