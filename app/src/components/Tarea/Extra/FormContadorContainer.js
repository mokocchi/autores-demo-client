import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addByScoreCriterion } from '../../../redux/actions'

import FormContador from './FormContador';

class FormContadorContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            mensaje: ''
        }
    }

    onClick = () => {
        if ((this.state.nombre !== '') && (this.state.mensaje !== '')) {
            this.props.dispatch(addByScoreCriterion({
                name: this.state.nombre,
                message: this.state.mensaje,
                scores: {}
            }));
            this.setState({
                nombre: '',
                mensaje: ''
            })
        }
    }

    handleInput = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        });
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onClick(e);
        }
    }

    render() {
        return <FormContador nombre={this.state.nombre} onChange={this.handleInput} mensaje={this.state.mensaje}
            onKeyPress={this.onKeyPress} onClick={this.onClick} disabled={(this.state.nombre === '') || (this.state.mensaje === '')} />
    }
}

function mapStateToProps(state) {
    const { tareaExtra } = state;
    return {
        tareaExtra
    }
}

export default connect(mapStateToProps)(FormContadorContainer);