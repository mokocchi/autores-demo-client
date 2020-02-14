import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addFileToExtra } from './redux/actions'

import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import tokenManager from './tokenManager';

class FormMultipleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }
        this.handlePlano = this.handlePlano.bind(this);
    }

    async handlePlano(event) {
        event.preventDefault();
        console.log(event.target);
        const file = event.target.files[0];

        if (file) {
            console.log(file);

            const url = window.URL.createObjectURL(file);
            console.log(url.substr(5));
            const filetype = file.type;

            const plano = new File([url], 'img.jpg', { type: filetype });
            console.log(plano);

            const formData = new FormData();
            formData.append('plano', plano);
            const planoData = await tokenManager.addPlanoToTarea(formData, 12);
            if (planoData.errors) {
                this.setState({
                    isLoading: false,
                    error: true,
                    errorMessage: planoData.errors
                });
                return;
            }

            this.props.dispatch(addFileToExtra(window.URL.createObjectURL(plano), plano.type));
        }
        else {
            console.log("no files selected");
        }
    }

    render() {
        return (
            <div>
                <h4>Depósito</h4>
                <Row>
                    <Col>
                        <FormGroup>
                            <Form.Label>Plano</Form.Label>
                            <FormControl name="images" type="file" onChange={this.handlePlano} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(FormMultipleChoice);