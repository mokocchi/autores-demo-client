import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    removeElementFromExtra, addScoreToCriterion, removeByScoreCriterion,
    removeScoreFromCriteria
} from '../../../redux/actions'

import FormContadores from './FormContadores';

class FormContadoresContainer extends Component {

    onClick = (item) => {
        this.props.dispatch(removeElementFromExtra(item));
        this.props.dispatch(removeScoreFromCriteria(item.code))
    }

    onClickQuitarLink = (e, item) => {
        e.preventDefault();
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
        return <FormContadores criterios={this.props.criterios} onClick={this.onClick}
            elements={this.props.elements} onClickQuitarLink={this.onClickQuitarLink} onChange={this.onChange} />
    }
}

function mapStateToProps(state) {
    const { tareaExtra } = state;
    const { byScore, elements } = tareaExtra;
    return {
        criterios: byScore,
        elements
    }
}
export default connect(mapStateToProps)(FormContadoresContainer);