import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import {  } from './redux/actions'

class FormOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            option: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({
            option: e.target.value
        })
    }

    async onClick(e) {
        e.preventDefault();
        //this.props.dispatch(addMultipleOption(this.state.option));
        console.log("add option " + this.state.option)
        this.setState({
            option: ''
        });
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            if (this.state.option !== "") {
                this.onClick(e);
            }
        }
    }

    render() {
        return (
            <Col>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl type="text" value={this.state.option} placeholder="Nueva opción" onChange={this.handleChange} onKeyPress={this.onKeyPress} />
                            <span className="input-group-btn">
                                <Button variant="success" disabled={this.state.option === ""} type="button" onClick={this.onClick}>
                                    Agregar
                                    </Button>
                            </span>
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    const { optionsByAttribute } = state

    return {
        optionsByAttribute
    }
}

export default connect(mapStateToProps)(FormOption);




