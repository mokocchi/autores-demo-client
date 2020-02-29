import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ActionList from '../../UI/ActionList'
import FormOptionContainer from './FormOptionContainer';

const FormElegirOpcion = (props) => {
    const elements = props.elements
    return (
        <div>
            <h4>Elegir una opción</h4>
            <Row>
                <Col>
                    <ActionList items={elements} field={"name"} value={"code"} action={true} onClick={props.onClick} />
                </Col>
                <Col />
            </Row>
            <Row>
                <Col>
                    <FormOptionContainer />
                </Col>
                <Col />
            </Row>
        </div>
    )
}

export default FormElegirOpcion;