import React from 'react';
import PropTypes from 'prop-types';
import ShowLinksList from '../UI/ShowLinksList';

const ActividadPublicList = ({ success, actividades }) => {
        return success && <ShowLinksList items={actividades} uriPrefix="/actividad" />
}

export default ActividadPublicList;

ActividadPublicList.propTypes = {
    success: PropTypes.bool.isRequired,
    actividades: PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.number
    })
}