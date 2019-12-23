import React, { Component } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeCorrectOptionFromExtra, removeOptionFromExtra } from './redux/actions'

import ActionList from './ActionList';
import FormOption from './FormOption';
import FormCorrectOptions from './FormCorrectOptions';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

class FormMultipleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            correctas: false
        }
    }

    handleCheck = (e) => {
        this.setState({
            correctas: !this.state.correctas
        })
    }

    onClickOptions = (item) => {
        this.props.dispatch(removeOptionFromExtra(item));
        this.props.dispatch(removeCorrectOptionFromExtra(item.code));
    }

    onClickCorrects = (item) => {
        this.props.dispatch(removeCorrectOptionFromExtra(item.code))
    }


    render() {
        const { options, correctAnswers } = this.props;
        return (
            <div>
                <h4>Opción Múltiple</h4>
                <Row>
                    <Col>
                        <ActionList items={options} field={"text"} value={"code"} action={true} onClick={this.onClickOptions} />
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
                                    Indicar opciones correctas
                            </FormCheckLabel>
                            </InputGroup>
                        </Col>
                    </Col>
                    <Col />
                </Row>
                {this.state.correctas &&
                    <>
                        <Row>
                            <Col>
                                <ActionList items={
                                    correctAnswers.map(item => {
                                        return {
                                            code: item,
                                            text: options.find(option => option.code === item).text
                                        }
                                    })
                                } action={true} onClick={this.onClickCorrects} value={"code"} field={"text"} />
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
    const { options, correctAnswers } = state.tareaExtra;
    return {
        options,
        correctAnswers
    }
}

export default connect(mapStateToProps)(FormMultipleChoice);