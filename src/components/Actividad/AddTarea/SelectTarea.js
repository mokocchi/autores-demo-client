import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { TIPOS_OPCIONES } from '../../../config';
import SearchBar from '../../UI/SearchBar';
import CheckBox from '../../UI/CheckBox';

const AddTareasSelectTarea = (props) => {
    return (
        <>
            <h2>Mis tareas{" "}
                <Link to={"/actividad/" + props.actividadId + "/nuevaTarea" + (props.clone ? "?clone=" + props.clone : "")} >
                    <Button variant="success" type="button">Nueva</Button>
                </Link>
            </h2>
            <Row>
                <Col>
                    <CheckBox checked={props.opciones} onChange={props.onOpcionesChange} label={"Con opciones"} />
                    {" "}
                    <CheckBox checked={props.todas} onChange={props.onTodasChange} label={"Mostrar todas"} />
                    <SearchBar
                        uri={'/tareas/user'}
                        authorized
                        allResults={props.todas}
                        placeholder={"Buscar tarea por nombre..."}
                        queryField={"nombre"}
                        extraQuery={{ opciones: props.opciones }}
                        onChange={props.onChange}
                        onSelect={props.onSelect}
                    />
                </Col>
                <Col>{(props.selectedTarea.id !== "") &&
                    <p><h5>{props.selectedTarea.nombre}</h5>
                        <b>Consigna:</b><br />
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