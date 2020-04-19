import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { TIPOS_OPCIONES } from '../../../config';
import SearchBar from '../../UI/SearchBar';

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
                    <SearchBar
                        uri={'/tareas/user'}
                        authorized
                        placeholder={"Buscar tarea por nombre..."}
                        onChange={props.onChange}
                        onSelect={props.onSelect}
                    />
                </Col>
                <Col>{(props.selectedTarea.id !== "") &&
                    <p><b>Consigna:</b><br />
                        <span>{props.selectedTarea.consigna}</span> <br />
                        <span><b>Tipo:</b> {props.selectedTarea.tipo.nombre}</span> <br />
                        <span><b>{TIPOS_OPCIONES.includes(props.selectedTarea.tipo.id.toString()) ? "Tiene opciones" : "No tiene opciones"}</b></span>
                        <span>
                            <Button className="float-right" variant="info" type="button"
                                onClick={props.onClick} disabled={props.selectedTarea.id === "" || props.disabled} >
                                Agregar
                            </Button>
                        </span>
                    </p>
                }</Col>
            </Row>
        </>
    )
}

export default AddTareasSelectTarea;