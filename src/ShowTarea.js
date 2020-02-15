import React, { Component } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';

import { TIPOS_PLANO } from './config';
import tokenManager from './tokenManager';

class ShowTarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tarea: null,
            errors: false
        }
        this.getTarea = this.getTarea.bind(this);
        this.getTarea();
    }

    async getTarea() {
        const data = await tokenManager.getTarea(this.props.tareaId)
        if (!data.errors) {
            this.setState({
                tarea: data
            })
        } else {
            this.setState({
                errors: true
            })
        }
    }

    render() {
        const { tarea, errors } = this.state;
        return (
            <>
                {
                    tarea ?
                        <>
                            <Row>
                                <Col>Nombre: {tarea.nombre}</Col>
                            </Row>
                            <Row>
                                <Col>Consigna: {tarea.consigna}</Col>
                            </Row>
                            <Row>
                                <Col>Tipo: {tarea.tipo.nombre}</Col>
                            </Row>
                            <Row>
                                <Col>Dominio: {tarea.dominio.nombre}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        TIPOS_PLANO.includes(tarea.tipo.id.toString()) &&
                                        <Image src={"http://localhost:8080/uploads/planos/" + tarea.codigo + ".png"} 
                                        style={{width:"30em"}} />
                                    }
                                </Col>
                            </Row>
                        </>
                        : "not tarea"
                }
                {errors && <legend>Tarea no encontrada</legend>}
            </>
        )
    }
}

export default ShowTarea;