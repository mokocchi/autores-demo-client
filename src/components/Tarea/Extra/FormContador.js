import React from 'react';
import { Button } from 'react-bootstrap';

import Input from '../../UI/Input'

const FormContador = (props) => {
    return (
        <div>
            <h4>Nuevo criterio</h4>
            <Input value={props.nombre} label={"Nombre"} placeholder={"Nombre"}
                controlId={"formNombre"} horizontal name={"nombre"}
                onChange={props.onChange}
            />
            <Input value={props.mensaje} label={"Mensaje"} placeholder={"Mensaje"}
                controlId={"formMensaje"} horizontal name={"mensaje"}
                onChange={props.onChange} onKeyPress={props.onKeyPress}
            />
            <Button type="button" variant="success" className="float-right" onClick={props.onClick}
                disabled={props.disabled}>Agregar</Button>
        </div>
    )
}

export default FormContador;