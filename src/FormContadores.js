import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux'
import { removeOptionFromExtra, addScoreToCriterion, removeScoreFromCriterion } from './redux/actions'

import FormOption from './FormOption';
import FormContador from './FormContador';
import ActionList from './ActionList';

class FormContadores extends Component {

    constructor(props) {
        super(props);
    }

    onClick = (item) => {
        this.props.dispatch(removeOptionFromExtra(item));
        this.props.dispatch(removeScoreFromCriterion(item.code))
    }

    onChange = (e) => {
        const score = {
            code: e.target.name,
            value: e.target.value
        };
        if (e.target.value != "") {
            this.props.dispatch(addScoreToCriterion(score))
        }
    }

    render() {
        const { criterios, options } = this.props;
        return (
            <div>
                <h3>Contadores</h3>
                <Row>
                    <Col>
                        {criterios.length > 0 && <FormOption />}
                    </Col>
                    <Col></Col>
                </Row>
                {criterios.map(item =>
                    <>
                        <h4>{item.name}</h4>
                        <i>{item.message}</i>
                        <Row>
                            <Col>
                                <ActionList items={options} action onClick={this.onClick}
                                    input={{ type: "number", placeholder: "Valor", onChange: this.onChange }}
                                    value={"code"} field={"text"} />
                            </Col>
                            <Col />
                        </Row>
                    </>)
                }
                <Row>
                    <Col>
                        <FormContador />
                    </Col>
                    <Col />
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { tareaExtra } = state;
    const { byScore, options } = tareaExtra;
    return {
        criterios: byScore,
        options
    }
}
export default connect(mapStateToProps)(FormContadores);