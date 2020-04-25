import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../../UI/ButtonSpinner';

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
                    <ButtonSpinner />
                    :
                    props.success ?
                        <Link to={"/actividad/" + props.actividadId + "/planificacion" + (props.clone ? "?clone=" + props.clone : "")}>
                            <Button variant="primary" type="button" style={{ marginTop: "1em" }}>Continuar</Button>
                        </Link>
                        :
                        <Button variant="info" type="button" disabled={props.success || props.disabled} onClick={props.onSubmit}>
                            Guardar
                        </Button>
            }
        </>

    )
}

export default AddTareasButton;