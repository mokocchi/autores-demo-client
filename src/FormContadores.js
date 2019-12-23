import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import {
    removeOptionFromExtra, addScoreToCriterion, removeByScoreCriterion,
    removeScoreFromCriteria
} from './redux/actions'

import FormOption from './FormOption';
import FormContador from './FormContador';
import ActionList from './ActionList';

class FormContadores extends Component {

    onClick = (item) => {
        this.props.dispatch(removeOptionFromExtra(item));
        this.props.dispatch(removeScoreFromCriteria(item.code))
    }

    onClickQuitarLink = (e, item) => {
        e.preventDefault();
        console.log(item);
        this.props.dispatch(removeByScoreCriterion(item));
    }

    onChange = (e) => {
        e.preventDefault();
        const score = {
            code: e.target.name.split('-')[0],
            value: e.target.value
        };
        const criterionName = e.target.id.split('-')[1];
        if (e.target.value !== "") {
            this.props.dispatch(addScoreToCriterion(score, criterionName))
        }
    }

    render() {
        const { criterios, options } = this.props;
        return (
            <div>
                <h3>Contadores</h3>
                <Row>
                    <Col>
                        <FormOption />
                        <ActionList items={options} action onClick={this.onClick}
                            group={"options"} value={"code"} field={"text"} />
                    </Col>
                    <Col></Col>
                </Row>
                {criterios.sort((a, b) => a.name > b.name).map(item =>
                    <div key={item.name}>
                        <h4>{item.name} (<a href={"#"} onClick={(e) => this.onClickQuitarLink(e, item)}>Quitar</a>)</h4>
                        <i>{item.message}</i>
                        <Row>
                            <Col>
                                <ActionList items={options}
                                    input={{ type: "number", onChange: this.onChange }}
                                    group={item.name} value={"code"} field={"text"} />
                            </Col>
                            <Col />
                        </Row>
                    </div>)
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