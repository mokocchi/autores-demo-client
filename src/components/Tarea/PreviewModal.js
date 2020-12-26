import React from "react";
import { Card, Modal } from "react-bootstrap";
import PreviewTareaSimple from "../UI/PreviewTareas/PreviewTareaSimple";
import PreviewTareaIngresarTexto from "../UI/PreviewTareas/PreviewTareaIngresarTexto";
import PreviewTareaSacarFoto from "../UI/PreviewTareas/PreviewTareaSacarFoto";


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