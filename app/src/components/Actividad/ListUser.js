import React from 'react';
import PropTypes from 'prop-types';

import ShowLinksList from '../UI/ShowLinksList';

const ActividadListUser = ({ success, actividades }) => {
    return success ? <ShowLinksList items={actividades} uriPrefix={"/actividad"} /> : <p>Cargando..</p>
}

export default ActividadListUser;

ActividadListUser.propTypes = {
    success: PropTypes.bool.isRequired,
    actividades: PropTypes.arrayOf(PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.number
    }))
}