import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import ActionList from '../../UI/ActionList';
import FormOptionContainer from './FormOptionContainer';
import FormContadorContainer from './FormContadorContainer';

const FormContadores = (props) => {
    const { criterios, elements } = props;
    return (
        <div>
            <h3>Contadores</h3>
            <Row>
                <Col>
                    <FormOptionContainer />
                    <ActionList items={elements} action onClick={props.onClick}
                        group={"elements"} value={"code"} field={"name"} />
                </Col>
                <Col></Col>
            </Row>
            {criterios.map(item =>
                <div key={item.name}>
                    <h4>{item.name} <Button variant={"danger"} onClick={(e) => props.onClickQuitarLink(e, item)}>Quitar</Button></h4>
                    <i>{item.message}</i>
                    <Row>
                        <Col>
                            <ActionList items={elements}
                                input={{ type: "number", onChange: props.onChange }}
                                group={item.name} value={"code"} field={"name"} />
                        </Col>
                        <Col />
                    </Row>
                </div>)
            }
            <Row>
                <Col>
                    <FormContadorContainer />
                </Col>
                <Col />
            </Row>
        </div>
    )
}

export default FormContadores;