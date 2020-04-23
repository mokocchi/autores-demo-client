import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import circleArrow from '../../assets/img/circleArrow.png';
import squareArrow from '../../assets/img/squareArrow.png';
import squareCrossedArrow from '../../assets/img/squareCrossedArrow.png';
import tarea from '../../assets/img/tarea.png'

const ReferencesModal = ({ show, onHide }) => (
    <Modal show={show} animation={false} centered onHide={onHide}>
        <Modal.Header closeButton>Referencias</Modal.Header>
        <Modal.Body>
            <Table>
                <tr>
                    <td>
                        <img src={circleArrow} alt="Flecha con círculo" width="100px" />
                    </td>
                    <td>Al terminar la primera tarea, siempre se pasa a la segunda</td>
                </tr>
                <tr>
                    <td>
                        <img src={squareArrow} alt="Flecha con cuadrado" width="100px" />
                    </td>
                    <td>Al terminar la primera tarea, se pasa a la segunda si se cumple la condición</td>
                </tr>
                <tr>
                    <td>
                        <img src={squareCrossedArrow} alt="Flecha con cuadrado tachado" width="100px" />
                    </td>
                    <td>
                        La condición debe ser ajustada porque no coincide con las opciones disponibles
                    </td>
                </tr>
                <tr>
                    <td><img src={tarea} alt="Tarea opcional"></img></td>
                    <td style={{verticalAlign: "middle"}}>Tarea Opcional (en gris)</td>
                </tr>
            </Table>

        </Modal.Body>
    </Modal>
)

export default ReferencesModal;