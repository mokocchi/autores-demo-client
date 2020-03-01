import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddTareasButton = (props) => {
    return (
        <>
            {props.error &&
                <Form.Text className="text-danger">
                    {props.errorMessage}
                </Form.Text>
            }
            {
                props.isLoading ?
                    <Button variant="info" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Cargando...
                    </Button>
                    :
                    props.success ?
                        <Link to={"/actividad/" + props.actividadId + "/planificacion"}>
                            <Button variant="primary" type="button" style={{ marginTop: "1em" }}>Continuar</Button>
                        </Link>
                        :
                        <Button variant="info" type="button" disabled={props.success} onClick={props.onSubmit}>
                            Guardar
                        </Button>
            }
        </>

    )
}

export default AddTareasButton;