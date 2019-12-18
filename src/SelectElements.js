import React, { Component } from 'react';
import { Form, Col, Button, Spinner } from 'react-bootstrap'

class SelectElements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: null,
            isLoading: null
        };
    }

    componentDidMount() {
        this.getElements();
    }

    async getElements() {
        if (!this.state.elements) {
            try {
                this.setState({ isLoading: true });
                const response = await fetch(this.props.url);
                const data = await response.json();
                this.setState({ elements: data, isLoading: false });
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <Form.Group as={Col} controlId={this.props.controlId}>
                <Form.Label>{this.props.label}</Form.Label>
                {this.state.isLoading &&
                    <Form.Control as={Button} variant="Light" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Cargando...
                    </Form.Control>
                }
                {this.state.elements &&
                    <Form.Control as="select">
                        {this.state.elements.map((item, index) => 
                            <option key={index}>{item.nombre}</option>
                        )}
                    </Form.Control>
                }
            </Form.Group>
        )
    }
}

export default SelectElements