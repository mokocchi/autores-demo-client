import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeElementFromExtra } from '../../../redux/actions'

import FormElegirOpcion from './FormElegirOpcion';

class FormElegirOpcionContainer extends Component {

    onClick = (item) => {
        this.props.dispatch(removeElementFromExtra(item))
    }

    render() {
        const elements = this.props.elements
        return (
            <FormElegirOpcion elements={elements} onClick={this.onClick} />
        )
    }
}

function mapStateToProps(state) {
    const { elements } = state.tareaExtra;
    return {
        elements,
    }
}

export default connect(mapStateToProps)(FormElegirOpcionContainer);