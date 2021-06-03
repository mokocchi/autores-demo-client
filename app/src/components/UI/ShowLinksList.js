import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ShowLinksList = ({items, uriPrefix}) => {
    return (
        <ul>
            {items && items.map((item, index) =>
                <Link key={index} to={uriPrefix + "/" + item.id + '/mostrar'}>
                    <li>{item.nombre}</li>
                </Link>
            )}
        </ul>
    )
}

ShowLinksList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        nombre: PropTypes.string,
        id: PropTypes.number
    })),
    uriPrefix: PropTypes.string.isRequired
}

export default ShowLinksList;