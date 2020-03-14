import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import SelectAPI from '../../UI/SelectAPI';

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
                <Col>Consigna:<br />{props.selectedTarea && <span>{props.selectedTarea.consigna}</span>}</Col>
            </Row>
        </>
    )
}

export default AddTareasSelectTarea;