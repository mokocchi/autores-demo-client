import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import SelectAPI from '../../UI/SelectAPI';
import { TIPOS_OPCIONES } from '../../../config';

const AddTareasSelectTarea = (props) => {
    return (
        <>
            <h2>Mis tareas{" "}
                <Link to={"/actividad/" + props.actividadId + "/nuevaTarea"} >
                    <Button variant="success" type="button">Nueva</Button>
                </Link>
            </h2>
            <Row>
                <Col>
                    <SelectAPI
                        uri={'/tareas/user'}
                        authorized
                        attribute={"tarea"}
                        controlId={"formTarea"}
                        label={""}
                        name={"tarea"}
                        defaultValue={""}
                        placeholder={"Elegí una tarea"}
                        onChange={props.onChange}
                    />
                </Col>
                <Col sm={2}>
                    <span>
                        <Button className="float-left" variant="info" type="button"
                            onClick={props.onClick} disabled={props.selectedTarea.id === "" || props.disabled} >
                            Agregar
                            </Button>
                    </span>
                </Col>
                <Col>{(props.selectedTarea.id !== "") &&
                    <p><b>Consigna:</b><br />
                        <span>{props.selectedTarea.consigna}</span> <br />
                        <span><b>Tipo:</b> {props.selectedTarea.tipo.nombre}</span> <br />
                        <span><b>{TIPOS_OPCIONES.includes(props.selectedTarea.tipo.id) ? "Tiene opciones" : "No tiene opciones"}</b></span>
                    </p>
                }</Col>
            </Row>
        </>
    )
}

export default AddTareasSelectTarea;