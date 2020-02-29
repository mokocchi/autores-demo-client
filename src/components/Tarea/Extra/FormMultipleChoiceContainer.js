import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeValidElementFromExtra, removeElementFromExtra, addDepositToElement, removeDepositFromElement, addFileToExtra } from '../../../redux/actions'

import FormMultipleChoice from './FormMultipleChoice';

class FormMultipleChoiceContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }
    }

    handleCheck = (e) => {
        this.setState({
            valid: !this.state.valid
        })
    }

    onClickElements = (item) => {
        this.props.dispatch(removeElementFromExtra(item));
        this.props.dispatch(removeValidElementFromExtra(item.code));
    }

    onClickValids = (item) => {
        this.props.dispatch(removeValidElementFromExtra(item.code))
    }

    onChangeChecks = (e) => {
        const codes = e.target.name.split('-');
        const depositCode = codes[0];
        const elementCode = codes[1];
        if (e.target.checked) {
            this.props.dispatch(addDepositToElement(elementCode, depositCode));
        } else {
            this.props.dispatch(removeDepositFromElement(elementCode, depositCode))
        }
    }

    handlePlano = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            this.props.dispatch(addFileToExtra(window.URL.createObjectURL(file), file.type));
        }
        else {
            console.log("no files selected");
        }
    }

    render() {
        const { elements, validElements, chosenTareas } = this.props;
        const depositos = chosenTareas
            .filter(tarea => tarea.tipo.codigo === "deposit")
            .map(tarea => { return { codigo: tarea.codigo, nombre: tarea.nombre } });
        return (
            <FormMultipleChoice title={this.props.title} recoleccion={this.props.recoleccion} depositos={depositos}
                onChangePlano={this.handlePlano} elements={elements} onClickElements={this.onClickElements}
                onChangeChecks={this.onChangeChecks} onChangeCheck={this.handleCheck}
                valid={this.state.valid} validElements={validElements} onClickValids={this.onClickValids} />
        )
    }
}

function mapStateToProps(state) {
    const { elements, validElements } = state.tareaExtra;
    const { chosenTareas } = state.actividadTareas;
    return {
        elements,
        validElements,
        chosenTareas
    }
}

export default connect(mapStateToProps)(FormMultipleChoiceContainer);