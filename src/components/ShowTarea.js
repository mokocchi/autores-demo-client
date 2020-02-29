import React from 'react';
import { Row, Col, Image, Container } from 'react-bootstrap';

const ShowTarea = (props) => {
    const { tarea, errors } = props;
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Tarea</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    {
                        tarea &&
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
                                    {props.imgSrc && <Image src={props.imgSrc} style={{ width: "30em" }} />
                                    }
                                </Col>
                            </Row>
                        </>
                    }
                    {errors && <legend>Tarea no encontrada</legend>}
                </Col>
            </Row>
        </Container>
    )
}

export default ShowTarea;