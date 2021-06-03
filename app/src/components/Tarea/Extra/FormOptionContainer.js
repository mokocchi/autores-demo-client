import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addElementToExtra } from '../../../redux/actions';

import { getRandomSlug } from '../../../utils'
import FormOption from './FormOption';

class FormOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementName: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({
            elementName: e.target.value
        })
    }

    onClick(e) {
        e.preventDefault();
        const element = { "name": this.state.elementName, "code": getRandomSlug() }
        this.props.dispatch(addElementToExtra(element));
        this.setState({
            elementName: ''
        });
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            if (this.state.elementName !== "") {
                this.onClick(e);
            }
        }
    }

    render() {
        return <FormOption elementName={this.state.elementName} onChange={this.handleChange} onKeyPress={this.onKeyPress} onClick={this.onClick} />
    }
}

function mapStateToProps(state) {
    const { optionsByAttribute } = state

    return {
        optionsByAttribute
    }
}

export default connect(mapStateToProps)(FormOptionContainer);




