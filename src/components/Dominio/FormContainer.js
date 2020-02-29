import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addSelectOption } from '../../redux/actions'

import tokenManager from '../../tokenManager';
import FormDominio from './Form';

class FormDominioContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dominio: '',
            errorMessage: '',
            error: false,
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({
            dominio: e.target.value
        })
    }

    async onClick(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });
        const data = await tokenManager.createDominio({
            "nombre": this.state.dominio
        });

        if (data.error_code) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.user_message
            });
        } else {
            this.props.dispatch(addSelectOption("dominio", data));
            this.setState({
                dominio: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
        }
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            if (this.state.dominio !== "") {
                this.onClick(e);
            }
        }
    }

    render() {
        return (
            <FormDominio dominio={this.state.dominio} onChange={this.handleChange} onKeyPress={this.onKeyPress}
                isLoading={this.state.isLoading} onClick={this.onClick} error={this.state.error} errorMessage={this.state.errorMessage}
            />
        )
    }
}

function mapStateToProps(state) {
    const { optionsByAttribute } = state

    return {
        optionsByAttribute
    }
}

export default connect(mapStateToProps)(FormDominioContainer);




