import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ShowLinksList from './ShowLinksList';

const ListaActividades = ({success, actividades}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Actividades Públicas</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    {success && <ShowLinksList items={actividades} uriPrefix="/actividad" />}
                </Col>
            </Row>
        </Container>
    )
}

export default ListaActividades;

ListaActividades.propTypes = {
    success: PropTypes.bool.isRequired,
    actividades: PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.number
    })
}