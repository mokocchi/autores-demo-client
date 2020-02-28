import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BuscarTarea from '../BuscarTarea';
import ListTareas from '../ListTareas';
import MisTareas from '../MisTareas';

const FormTareas = (props) => {
    return (
        <>
            <BuscarTarea />
            <MisTareas />
            <ListTareas />

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
                        <Link to={"/actividad/" + props.actividadId + "/flujo"}>
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

export default FormTareas;