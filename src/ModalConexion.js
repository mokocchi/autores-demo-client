import React from 'react';
import { Modal, Card, Button } from 'react-bootstrap';

function getTareaById(tareas, id) {
    return tareas.find(tarea => tarea.id === id);
}

function ModalConexion({ show, conexion, handleClose, tareas }) {
    return (
        <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Conexión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card body>
                    Desde la tarea <b>"{getTareaById(tareas, conexion.origen).nombre}"</b> hacia la tarea
                    {" "}<b>"{getTareaById(tareas, conexion.destino).nombre}"</b>
                    {conexion.condicion &&
                        <span>{" "}cuando <b>{conexion.condicion.name}</b> la {["YES","NO"].includes(conexion.condicion.code) ? "opción" : "tarea"} <b>{conexion.respuesta.name}</b></span>
                    }
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger">Quitar conexión</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConexion;