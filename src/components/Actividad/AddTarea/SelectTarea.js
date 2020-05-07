import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { TIPOS_OPCIONES } from '../../../config';
import SearchBar from '../../UI/SearchBar';
import CheckBox from '../../UI/CheckBox';
import Icon from 'react-web-vector-icons';

const AddTareasSelectTarea = (props) => {
    return (
        <>
            <h2>Buscar en Mis tareas{" "}
                <Link to={"/actividad/" + props.actividadId + "/nuevaTarea" + (props.clone ? "?clone=" + props.clone : "")} >
                    <Button variant="success" type="button">Nueva</Button>
                </Link>
            </h2>
            <Button onClick={props.onTodasChange}>{props.todas ? "Buscar" : "Mostrar todas"}</Button>
            {" "}
            <CheckBox checked={props.opciones} onChange={props.onOpcionesChange} label={"Mostrar solo las que tienen opciones"} />
            <SearchBar
                uri={'/tareas/user'}
                authorized
                allResults={props.todas}
                placeholder={"Buscar tarea por nombre..."}
                queryField={"nombre"}
                extraQuery={{ opciones: props.opciones }}
                onSelect={props.onSelect}
            />
            {(props.selectedTarea.id !== "") &&
                <Modal show={props.showModal} onHide={props.toggleShowModal}>
                    <Modal.Header closeButton>
                        {props.selectedTarea.nombre}
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <b>Consigna:</b> <span>{props.selectedTarea.consigna}</span> <br />
                            <span><b>Tipo:</b> {props.selectedTarea.tipo.nombre}</span> <br />
                            <span>{TIPOS_OPCIONES.includes(props.selectedTarea.tipo.id.toString()) ?
                             <span><Icon name="md-checkmark" font="Ionicons" color="black" size={"1rem"} /> Tiene opciones</span> : 
                             <span><Icon name="exclamation-circle" font="FontAwesome" color="black" size={"1rem"} /> No tiene opciones</span>
                             }</span>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="float-right" variant="info" type="button"
                            onClick={props.onClick} disabled={props.selectedTarea.id === "" || props.disabled} >
                            Usar como reemplazo
                            </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default AddTareasSelectTarea;