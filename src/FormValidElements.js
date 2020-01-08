import React, { Component } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addValidElementToExtra } from './redux/actions'

import Select from './Select';

class FormValidElements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedElementId : ""
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
        const { elements } = this.props;
        return (
            <InputGroup>
                <Select
                    defaultValue={""}
                    placeholder={"Elegí un elemento"}
                    options={elements}
                    onChange={this.onChange}
                    onPropsChangeLess={this.onPropsChangeLess}
                    value={"code"}
                    field={"name"}
                />
                <span>
                    <Button variant="info" type="button" onClick={this.onClick} disabled={this.state.selectedElementId === ""} >
                        Agregar
                    </Button>
                </span>
            </InputGroup>
        )
    }
}

function mapStateToProps(state) {
    const { elements } = state.tareaExtra;
    return {
        elements,
    }
}

export default connect(mapStateToProps)(FormValidElements);