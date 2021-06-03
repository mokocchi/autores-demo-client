import React from 'react';
import { Spinner, Button, Form } from 'react-bootstrap'

function LoadSpinner() {
    return (
        <Form.Control as={Button} variant="Light" disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Cargando...
        </Form.Control>
    )
}

export default LoadSpinner