import React, { Component } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addCorrectAnswerToExtra } from './redux/actions'

import Select from './Select';

class FormCorrectoptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOptionId : ""
        }
    }

    onClick = () => {
        if (this.state.selectedOptionId !== "") {
            this.props.dispatch(addCorrectAnswerToExtra(this.state.selectedOptionId))
        }
    }

    onChange = (e) => {
        this.setState({
            selectedOptionId: e.target.value
        })
    }

    render() {
        const { options } = this.props;
        return (
            <InputGroup>
                <Select
                    defaultValue={""}
                    placeholder={"Elegí una opción"}
                    options={options}
                    onChange={this.onChange}
                    value={"code"}
                    field={"text"}
                />
                <span>
                    <Button variant="info" type="button" onClick={this.onClick} disabled={this.state.selectedOptionId === ""} >
                        Agregar
                    </Button>
                </span>
            </InputGroup>
        )
    }
}

function mapStateToProps(state) {
    const { options } = state.tareaExtra;
    return {
        options,
    }
}

export default connect(mapStateToProps)(FormCorrectoptions);