import React from 'react';
import { Row, Col, Image, Container } from 'react-bootstrap';

const TareaShow = (props) => {
    const { tarea, errors } = props;
    return (
        <>
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
        </>
    )
}

export default TareaShow;