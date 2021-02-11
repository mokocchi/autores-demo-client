import React, { useState } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';
import SelectNuevaOpcion from './SelectNuevaOpcion';

function getTareaById(tareas, id) {
    return tareas.find(tarea => tarea.id === id);
}

function ModalConexion({ show, conexion, handleClose, tareas, onRemoveConexion, opciones, setOpcion }) {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
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
                        <span>{" "}cuando
                        {(conexion.condicion.code === "CORRECT") ?
                                <b> se eligieron todos los elementos correctos</b>
                                :
                                (conexion.condicion.code === "INCORRECT") ?
                                    <b> no se eligieron todos los elementos correctos</b>
                                    :
                                    <span><b>{conexion.condicion.name}</b> la {["YES", "NO"].includes(conexion.condicion.code) ? "opción" : "tarea"}
                                        <b>{conexion.respuesta.name || (!mostrarOpciones && <Button onClick={() => setMostrarOpciones(true)}>Elegir opción nueva...</Button>)}</b></span>
                            }
                        </span>
                    }
                    {mostrarOpciones && <SelectNuevaOpcion onClick={setOpcion} opciones={opciones} />}
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button id="quitar-conexion-button" variant="danger" onClick={() => { onRemoveConexion(conexion); handleClose() }}>Quitar conexión</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConexion;