import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeElementFromExtra } from './redux/actions'

import ActionList from './ActionList'
import FormOption from './FormOption';

class FormElegirOpcion extends Component {

    onClick = (item) => {
        this.props.dispatch(removeElementFromExtra(item))
    }

    render() {
        const elements = this.props.elements
        return (
            <div>
                <h4>Elegir una opción</h4>
                <Row>
                    <Col>
                        <ActionList items={elements} field={"name"} value={"code"} action={true} onClick={this.onClick} />
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
    const { elements } = state.tareaExtra;
    return {
        elements,
    }
}

export default connect(mapStateToProps)(FormElegirOpcion);