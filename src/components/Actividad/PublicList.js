import React from 'react';
import PropTypes from 'prop-types';
import ShowLinksList from '../UI/ShowLinksList';

const ActividadPublicList = ({ success, actividades, error, errorMessage }) => {
    return (
        error ? <span className="text-danger">{errorMessage}</span>
            : success &&
                actividades.length > 0 ? <ShowLinksList items={actividades} uriPrefix="/actividad" />
                : "No hay actividades"
    )


}

export default ActividadPublicList;

ActividadPublicList.propTypes = {
    success: PropTypes.bool.isRequired,
    actividades: PropTypes.arrayOf(PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.number
    }))
}