import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Form, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addSelectOption } from './redux/actions'

import { API_BASE_URL } from './config'
import LoadSpinner from './LoadSpinner'

const HTTP_CREATED = 201;
class FormDominio extends Component {

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
        this.onKeyPress = this.onKeyPress.bind (this);
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

        const response = await fetch(API_BASE_URL + '/dominios', {
            method: 'POST',
            body: JSON.stringify({
                "nombre": this.state.dominio
            })
        });
        const data = await response.json();

        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
        } else {
            if(response.status === HTTP_CREATED) {
                this.props.dispatch(addSelectOption("dominio", data));
            }
            this.setState({
                dominio: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
        }
    }

    onKeyPress(e) {
        if(e.key === "Enter") {
            if (this.state.dominio !== "") {
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
                            <FormControl type="text" value={this.state.dominio} placeholder="Nuevo dominio" onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
                            <span className="input-group-btn">
                                {this.state.isLoading ?
                                    <LoadSpinner />
                                    :
                                    <Button variant="success" disabled={this.state.dominio === ""} type="button" onClick={this.onClick}>
                                        Agregar
                                    </Button>
                                }
                            </span>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.error &&
                            <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                {this.state.errorMessage}
                            </Form.Text>
                        }
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

export default connect(mapStateToProps)(FormDominio);




