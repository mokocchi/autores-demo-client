import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Form, Spinner, Col, Row } from 'react-bootstrap'

import { API_BASE_URL } from './config'

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
        this.onSubmit = this.onSubmit.bind(this);
        this.click = this.click.bind(this);
    }

    handleChange(e) {
        this.setState({
            dominio: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        const response = await fetch(API_BASE_URL + '/dominio', {
            method: 'POST',
            body: JSON.stringify({
                "dominio": this.state.dominio
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
            this.setState({
                dominio: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
            this.props.onAddition(data);
        }
    }

    async click() { 
        this.props.onAddition("miDominio");
    }

    render() {
        return (
            <Col>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl type="text" placeholder="Nuevo dominio" onChange={this.handleChange} />
                            <span className="input-group-btn">
                                {this.state.isLoading ?
                                    <Form.Control as={Button} variant="Light" disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Cargando...
                            </Form.Control>
                            :
                            <Button variant="success" type="button" onClick={this.click}>
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
                            <Form.Text className="text-danger" style={{marginTop: "-1em"}}>
                                {this.state.errorMessage}
                            </Form.Text>
                        }
                    </Col>
                </Row>
            </Col>

        )
    }
}

export default FormDominio




