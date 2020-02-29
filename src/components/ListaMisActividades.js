import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
import ShowLinksList from './ShowLinksList';

const ListaMisActividades = ({success, actividades}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Mis actividades</h2>
                </Col>
            </Row>
            <Row>
                <Col style={{ border: "1px solid black", padding: "2em" }}>
                    {success && <ShowLinksList items={actividades} uriPrefix={"/actividad"} />}
                </Col>
            </Row>
        </Container >
    )
}

export default ListaMisActividades;

ListaMisActividades.propTypes = {
    success: PropTypes.bool.isRequired,
    actividades: PropTypes.arrayOf(PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.number
    }))
}