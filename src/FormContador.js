import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import Input from './Input'

class FormContador extends Component {
    render(){
        return(
            <div>
                <h4>Nuevo criterio</h4>
                <Input label={"Nombre"} placeholder={"Nombre"} controlId={"formNombre"} horizontal/>
                <Input label={"Mensaje"} placeholder={"Mensaje"} controlId={"formMensaje"} horizontal/>
                <Button type="button" variant="success" className="float-right">Agregar</Button>
            </div>
        )
    }
}

export default FormContador;