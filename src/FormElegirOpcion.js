import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeOptionFromExtra } from './redux/actions'

import ActionList from './ActionList'
import FormOption from './FormOption';

class FormElegirOpcion extends Component {

    onClick = (item) => {
        this.props.dispatch(removeOptionFromExtra(item))
    }

    render() {
        const options = this.props.options
        return (
            <div>
                <h4>Elegir una opción</h4>
                <Row>
                    <Col>
                        <ActionList items={options} field={"text"} value={"code"} action={true} onClick={this.onClick} />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        <FormOption />
                    </Col>
                    <Col />
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { options } = state.tareaExtra;
    return {
        options,
    }
}

export default connect(mapStateToProps)(FormElegirOpcion);