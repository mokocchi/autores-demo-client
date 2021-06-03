import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const ButtonSpinner = ({ className }) => (
    <Button variant="info" disabled className={className}>
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
        />
                        Cargando...
    </Button>
)

export default ButtonSpinner;