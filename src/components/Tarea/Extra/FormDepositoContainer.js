import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFileToExtra } from '../../../redux/actions'

import FormDeposito from './FormDeposito';

class FormDepositoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }
        this.handlePlano = this.handlePlano.bind(this);
    }

    handlePlano(event) {
        event.preventDefault();
        const plano = event.target.files[0];

        if (plano) {
            this.props.dispatch(addFileToExtra(window.URL.createObjectURL(plano), plano.type));
        }
        else {
            console.log("no files selected");
        }
    }

    render() {
        return <FormDeposito handlePlano={this.handlePlano} />
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(FormDepositoContainer);