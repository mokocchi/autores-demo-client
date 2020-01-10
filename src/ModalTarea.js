import React, { Component } from 'react';
import memoize from 'memoize-one'
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import Select from './Select';
import CheckBox from './CheckBox';
import { TIPOS_OPCIONES, CONDITIONS_ARRAY } from './config';
import md5 from 'md5';

class ModalTarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showConexiones: false,
            showCondicion: false,
            selectedAntecedente: null,
            agregarConexionDisabled: true,
            selectedCondition: null,
            selectedAnswerTask: null
        }
    }

    filterAntecedentes = memoize(
        (saltos, codigoTarea) => saltos.map(salto => salto.to.includes(codigoTarea))
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
            selectedAntecedente: { id: parseInt(e.target.value), name: origenName },
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
        const origen = this.state.selectedAntecedente;
        if (this.state.showCondicion) {
            origen.condicion = this.state.selectedCondition
            origen.respuesta = this.state.selectedAnswerTask;
        }

        const salto = {
            destino: this.props.tarea.id,
            origen: origen.id,
            condicion: origen.condicion,
            respuesta: origen.respuesta,
        };
        salto.id = md5(salto.destino + "_" + salto.origen + (salto.condicion ? "_" + salto.condicion + "_" + salto.respuesta : ""));
        this.props.onAddConexion(salto);
        this.props.handleClose();
    }

    getSelectableTareas = () => {
        const selectedTareas = this.filterAntecedentes(this.props.tarea.saltos, this.props.tarea.codigo);
        const selectableTareas = this.props.tareas.filter(tarea => tarea.id !== this.props.tarea.id && selectedTareas.findIndex(t => t.id === tarea.id) === -1);
        return selectableTareas;
    }

    getTareaTipo = (tareaId) => {
        return this.findTarea(tareaId, this.props.tareas).tipo.id.toString();
    }

    prevTareaHasOptions = () => {
        return TIPOS_OPCIONES.includes(this.getTareaTipo(this.state.selectedAntecedente.id));
    }

    getPrevTareaOptions = () => {
        const tareaId = this.state.selectedAntecedente.id;
        return this.findTarea(tareaId, this.props.tareas).extra.elements;
    }

    getAnswerTaskLabel = () => {
        if (this.state.selectedCondition) {
            switch (this.state.selectedCondition.code) {
                case "YES":
                case "NO":
                    return "la opción";
                case "YES_START":
                case "NO_START":
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
                        <Select key={this.state.selectedCondition.code} options={this.getPrevTareaOptions()} defaultValue={""} value={"code"} field={"name"}
                            placeholder={"Elegir..."} onChange={this.onAnswerTaskChange} />
                    );
                case "YES_START":
                case "NO_START":
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
                    <Modal.Title>{tarea.nombre}</Modal.Title>
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
                                <Row>
                                    <Col>
                                        <span>Después de...</span>
                                    </Col>
                                    <Col>
                                        <Select options={this.getSelectableTareas()} field={"nombre"} value={"id"} defaultValue={""}
                                            placeholder={"Elegir antecedente"} onChange={this.onConexionChange} />
                                    </Col>
                                </Row>

                                {this.state.selectedAntecedente && this.prevTareaHasOptions() &&
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
                                                <Select options={CONDITIONS_ARRAY} defaultValue={""} value={"code"} field={"name"}
                                                    placeholder={"Elegir..."} onChange={this.onCondicionSelectChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>{this.getAnswerTaskLabel()}</Col>
                                            <Col>
                                                {this.state.selectedAntecedente &&
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