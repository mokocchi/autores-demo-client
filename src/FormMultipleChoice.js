import React, { Component } from 'react';
import { Row, Col, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeValidElementFromExtra, removeElementFromExtra } from './redux/actions'

import ActionList from './ActionList';
import FormOption from './FormOption';
import FormCorrectOptions from './FormCorrectOptions';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

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


    render() {
        const { elements, validElements } = this.props;
        return (
            <div>
                <h4>Opción Múltiple</h4>
                <Row>
                    <Col>
                        <ActionList items={elements} field={"text"} value={"code"} action={true} onClick={this.onClickElements} />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        <FormOption />
                    </Col>
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
                                            text: elements.find(element => element.code === item).text
                                        }
                                    })
                                } action={true} onClick={this.onClickValids} value={"code"} field={"text"} />
                            </Col>
                            <Col />
                        </Row>
                        <Row>
                            <Col>
                                <FormCorrectOptions />
                            </Col>
                            <Col />
                        </Row>
                    </>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { elements, validElements } = state.tareaExtra;
    return {
        elements,
        validElements
    }
}

export default connect(mapStateToProps)(FormMultipleChoice);