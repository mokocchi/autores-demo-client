import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addElementToExtra } from './redux/actions';

import { getRandomSlug } from './utils'

class FormOption extends Component {

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

    async onClick(e) {
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
        return (
            <Col>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl type="text" value={this.state.elementName} placeholder="Nuevo elemento" onChange={this.handleChange} onKeyPress={this.onKeyPress} />
                            <span className="input-group-btn">
                                <Button variant="success" disabled={this.state.elementName === ""} type="button" onClick={this.onClick}>
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




