import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addByScoreCriterion } from './redux/actions'

import Input from './Input'

class FormContador extends Component {

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
        return (
            <div>
                <h4>Nuevo criterio</h4>
                <Input value={this.state.nombre} label={"Nombre"} placeholder={"Nombre"}
                    controlId={"formNombre"} horizontal name={"nombre"}
                    onChange={this.handleInput}
                />
                <Input value={this.state.mensaje} label={"Mensaje"} placeholder={"Mensaje"}
                    controlId={"formMensaje"} horizontal name={"mensaje"}
                    onChange={this.handleInput} onKeyPress={this.onKeyPress}
                />
                <Button type="button" variant="success" className="float-right" onClick={this.onClick}
                    disabled={(this.state.nombre === '') || (this.state.mensaje === '')}>Agregar</Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { tareaExtra } = state;
    return {
        tareaExtra
    }
}

export default connect(mapStateToProps)(FormContador);