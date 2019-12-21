import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addOptionToExtra } from './redux/actions';

import { getRandomSlug } from './utils'

class FormOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionText: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    handleChange(e) {
        this.setState({
            optionText: e.target.value
        })
    }

    async onClick(e) {
        e.preventDefault();
        const option = { "text": this.state.optionText, "code": getRandomSlug() }
        this.props.dispatch(addOptionToExtra(option));
        this.setState({
            optionText: ''
        });
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            if (this.state.optionText !== "") {
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
                            <FormControl type="text" value={this.state.optionText} placeholder="Nueva opción" onChange={this.handleChange} onKeyPress={this.onKeyPress} />
                            <span className="input-group-btn">
                                <Button variant="success" disabled={this.state.optionText === ""} type="button" onClick={this.onClick}>
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




