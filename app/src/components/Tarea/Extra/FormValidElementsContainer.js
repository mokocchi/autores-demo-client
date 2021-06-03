import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addValidElementToExtra } from '../../../redux/actions'

import FormValidElements from './FormValidElements';

class FormValidElementsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedElementId: ""
        }
    }

    onClick = () => {
        if (this.state.selectedElementId !== "") {
            this.props.dispatch(addValidElementToExtra(this.state.selectedElementId))
        }
    }

    onChange = (e) => {
        this.setState({
            selectedElementId: e.target.value
        })
    }

    onPropsChangeLess = () => {
        this.setState({
            selectedElementId: ""
        })
    }

    render() {
        return <FormValidElements options={this.props.elements} onChange={this.onChange} onPropsChangeLess={this.onPropsChangeLess}
            onClick={this.onClick} disabled={this.state.selectedElementId === ""} />
    }
}

function mapStateToProps(state) {
    const { elements } = state.tareaExtra;
    return {
        elements,
    }
}

export default connect(mapStateToProps)(FormValidElementsContainer);