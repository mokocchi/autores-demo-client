import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import tokenManager from './tokenManager';
import loggedIn from './loggedIn';
import { Container, Row, Col } from 'react-bootstrap';

class ListaActividades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
            success: false
        }
        this.getActividades = this.getActividades.bind(this);
    }

    componentDidMount() {
        this.getActividades();
    }

    async getActividades() {
        const data = await tokenManager.getActividadesPublic();
        if (!data.error_code) {
            this.setState({
                actividades: data.results,
                success: true
            })
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Actividades Públicas</h2>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ border: "1px solid black", padding: "2em" }}>
                        <ul>
                            {this.state.success && this.state.actividades.map((actividad, index) =>
                                <Link key={index} to={'/actividad/' + actividad.id + '/mostrar'}>
                                    <li>{actividad.nombre}</li>
                                </Link>
                            )}
                        </ul>
                    </Col>
                </Row>
            </Container >
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(ListaActividades);