import React, { Component } from 'react';
import memoize from 'memoize-one'
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import Select from '../UI/Select';
import CheckBox from '../UI/CheckBox';
import { TIPOS_OPCIONES, CONDITIONS_ARRAY, TASK_CONDITIONS_ARRAY } from '../../config';
import md5 from 'md5';

class ModalTarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showConexiones: false,
            showCondicion: false,
            selectedSiguiente: null,
            agregarConexionDisabled: true,
            selectedCondition: null,
            selectedAnswerTask: null
        }
    }

    filterSiguientes = memoize(
        (conexiones, idTarea) => conexiones.filter(conexion => conexion.origen === idTarea)
    );

    findTarea = memoize(
        (tareaId, tareas) => tareas.find(tarea => tarea.id === tareaId)
    )

    onInicialChange = () => {
        const { tarea } = this.props;
        tarea.initial = !tarea.initial;
        this.props.onUpdateTarea(tarea);
    }

    onOptionalChange = () => {
        const { tarea } = this.props;
        tarea.optional = !tarea.optional;
        this.props.onUpdateTarea(tarea);
    }

    onClickMostrarConexiones = () => {
        this.setState({
            showConexiones: !this.state.showConexiones
        })
    }

    onCondicionCheckboxChange = () => {
        //if it wasn't checked (and now it is)
        if (!this.state.showCondicion) {
            this.setState({
                agregarConexionDisabled: true
            })
        }
        this.setState({
            showCondicion: !this.state.showCondicion
        })
    }

    onConexionChange = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        const origenName = e.nativeEvent.target[index].text
        this.setState({
            selectedSiguiente: { id: parseInt(e.target.value), name: origenName },
            agregarConexionDisabled: false
        })
    }

    onCondicionSelectChange = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        const condicionName = e.nativeEvent.target[index].text
        this.setState({
            selectedCondition: { code: e.target.value, name: condicionName },
            agregarConexionDisabled: true
        })
    }

    onAnswerTaskChange = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        const answerTaskName = e.nativeEvent.target[index].text
        this.setState({
            selectedAnswerTask: { id: e.target.value, name: answerTaskName },
            agregarConexionDisabled: false
        })

    }

    onClickAgregarConexion = () => {
        const conexion = this.state.selectedSiguiente;
        if (this.state.showCondicion) {
            conexion.condicion = this.state.selectedCondition
            conexion.respuesta = this.state.selectedAnswerTask;
        }

        conexion.origen = this.props.tarea.id;
        conexion.destino = conexion.id;
        conexion.id = md5(conexion.origen + "_" + conexion.destino + (conexion.condicion ? "_" + conexion.condicion + "_" + conexion.respuesta : ""));
        this.props.onAddConexion(conexion);
        this.props.handleClose();
    }

    getSelectableTareas = () => {
        const conexionesSiguientes = this.filterSiguientes(this.props.conexiones, this.props.tarea.id);
        const selectableTareas = this.props.tareas.filter(tarea => tarea.id !== this.props.tarea.id && conexionesSiguientes.findIndex(conexion => conexion.destino === tarea.id) === -1);
        return selectableTareas;
    }

    tareaHasOptions = () => {
        return TIPOS_OPCIONES.includes(this.props.tarea.tipo.id.toString());
    }

    getAnswerTaskLabel = () => {
        if (this.state.selectedCondition) {
            switch (this.state.selectedCondition.code) {
                case "YES":
                case "NO":
                    return "la opción";
                case "YES_TASK":
                case "NO_TASK":
                    return "la tarea";
            }
        } else return "la opción/tarea..."

    }

    getAnswerTareaSelect = () => {
        if (this.state.selectedCondition) {
            switch (this.state.selectedCondition.code) {
                case "YES":
                case "NO":
                    return (
                        <Select key={this.state.selectedCondition.code} options={this.props.tarea.extra.elements} defaultValue={""} value={"code"} field={"name"}
                            placeholder={"Elegir..."} onChange={this.onAnswerTaskChange} />
                    );
                case "YES_TASK":
                case "NO_TASK":
                    return (
                        <Select key={this.state.selectedCondition.code} options={this.props.tareas} defaultValue={""} value={"id"} field={"nombre"}
                            placeholder={"Elegir..."} onChange={this.onAnswerTaskChange} />
                    );
            }
        } else {
            return (
                <Select options={[]} defaultValue={""} placeholder={"Elegir..."} />
            )
        }
    }

    render() {
        const { tarea, show } = this.props;
        return (
            <Modal show={show} onHide={this.props.handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tarea seleccionada: {tarea.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card body>
                        <p>{tarea.consigna}</p>
                        <Row>
                            <Col>
                                <CheckBox checked={tarea.optional} onChange={this.onOptionalChange} label={"Opcional"} />
                                <br />
                                <CheckBox checked={tarea.initial} onChange={this.onInicialChange} label={"Inicial"} />
                            </Col>
                            <Col>
                                {!this.state.showConexiones && <Button variant="primary" onClick={this.onClickMostrarConexiones} >Agregar conexiones</Button>}
                            </Col>
                        </Row>
                        {this.state.showConexiones && this.getSelectableTareas().length > 0 &&
                            <Card body>
                                <h5>Agregar conexión</h5>
                                <Row>
                                    <Col>
                                        <span>Hacia la tarea...</span>
                                    </Col>
                                    <Col>
                                        <Select options={this.getSelectableTareas()} field={"nombre"} value={"id"} defaultValue={""}
                                            placeholder={"Elegir siguiente"} onChange={this.onConexionChange} />
                                    </Col>
                                </Row>

                                {this.state.selectedSiguiente &&
                                    <Row>
                                        <Col md={6}>
                                            <CheckBox checked={this.state.showCondicion} onChange={this.onCondicionCheckboxChange} label={"Mostrar condición"} />
                                        </Col>
                                    </Row>}
                                {this.state.showCondicion &&
                                    <>
                                        <Row>
                                            <Col>Cuando...</Col>
                                            <Col>
                                                <Select options={ this.tareaHasOptions() ? CONDITIONS_ARRAY : TASK_CONDITIONS_ARRAY} defaultValue={""} value={"code"} field={"name"}
                                                    placeholder={"Elegir..."} onChange={this.onCondicionSelectChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>{this.getAnswerTaskLabel()}</Col>
                                            <Col>
                                                {this.state.selectedSiguiente &&
                                                    this.getAnswerTareaSelect()
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                }
                                <Button variant="success" className="float-right" disabled={this.state.agregarConexionDisabled}
                                    onClick={this.onClickAgregarConexion}>Agregar conexión</Button>
                            </Card>
                        }
                    </Card>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalTarea;