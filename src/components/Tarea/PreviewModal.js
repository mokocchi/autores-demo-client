import React from "react";
import { Card, Modal } from "react-bootstrap";
import PreviewTareaSimple from "../UI/PreviewTareas/PreviewTareaSimple";
import PreviewTareaIngresarTexto from "../UI/PreviewTareas/PreviewTareaIngresarTexto";
import PreviewTareaSacarFoto from "../UI/PreviewTareas/PreviewTareaSacarFoto";
import PreviewTareaElegirOpcion from "../UI/PreviewTareas/PreviewTareaElegirOpcion";
import PreviewTareaOpcionMultiple from "../UI/PreviewTareas/PreviewTareaOpcionMultiple";


const tareaPorTipo = (tarea) => {
    switch (tarea.tipo) {
        //TODO: parametrizar
        case "1":
            return <PreviewTareaSimple tarea={tarea} />
        case "2":
            return <PreviewTareaIngresarTexto tarea={tarea} />
        case "3":
            return <PreviewTareaIngresarTexto tarea={tarea} numero />
        case "4":
            return <PreviewTareaSacarFoto tarea={tarea} />
        case "5":
            return <PreviewTareaElegirOpcion tarea={tarea} />
        case "6":
            return <PreviewTareaOpcionMultiple tarea={tarea} />
        default:
            return <PreviewTareaSimple tarea={tarea} />
    }
}

const PreviewTareaModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vista previa de la tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tareaPorTipo(props.tarea)}
            </Modal.Body>
        </Modal>
    )
}

export default PreviewTareaModal;