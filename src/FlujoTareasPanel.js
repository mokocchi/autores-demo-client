import React, { Component } from 'react';
import { Accordion, Card, Form, Button } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import Select from './Select';
import { TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_RECOLECCION } from './config';

class FlujoTareasPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inicialChecked: this.props.tareasList.map(tarea => true),
            condicionChecked: this.props.tareasList.map(tarea => false),
            tareasUbicadas: [],
            saltoElegido: {},
            newSaltos: {},
            agregarSaltoDisabled: this.props.tareasList.map(tarea => true)
        }
    }

    onInicialChange = (inicialIndex) => {
        const newSaltos = this.state.newSaltos;
        newSaltos[inicialIndex] = [];
        this.setState({
            inicialChecked: this.state.inicialChecked.map((item, index) =>
                (index !== inicialIndex) ? this.state.inicialChecked[index] : !this.state.inicialChecked[index]),
            newSaltos
        });
    }

    onCondicionChange = (condicionIndex) => {
        this.setState({
            condicionChecked: this.state.condicionChecked.map((item, index) =>
                (index !== condicionIndex) ? this.state.condicionChecked[index] : !this.state.condicionChecked[index])
        });
    }

    onUbicarTarea = (tareaPorUbicar) => {
        this.setState({
            tareasUbicadas: [...this.state.tareasUbicadas.filter(tarea => tarea.id !== tareaPorUbicar.id), tareaPorUbicar]
        })
        this.props.onAddTarea(tareaPorUbicar);
        if (this.state.newSaltos[tareaPorUbicar.graphId - 1]) {
            this.state.newSaltos[tareaPorUbicar.graphId - 1].forEach(salto => {
                this.props.onAddSalto({ destino: tareaPorUbicar.id, idOrigen: parseInt(salto.id), id: (salto.id + "->" + tareaPorUbicar.id) })
            })
        }
    }

    onQuitarTarea = (tareaPorQuitar) => {
        this.setState({
            tareasUbicadas: this.state.tareasUbicadas.filter(tarea => tarea.id !== tareaPorQuitar.id)
        })
        this.props.onRemoveTarea(tareaPorQuitar);
    }

    onSelectChange = (e) => {
        const selectName = e.target.name;
        const saltoElegido = this.state.saltoElegido;
        const index = e.nativeEvent.target.selectedIndex;
        const origenName = e.nativeEvent.target[index].text
        saltoElegido[selectName] = { id: e.target.value, name: origenName }
        const agregarSaltoDisabled = this.state.agregarSaltoDisabled;
        agregarSaltoDisabled[selectName] = false;
        this.setState({
            saltoElegido,
            agregarSaltoDisabled
        })
    }

    onAgregarSalto = (index) => {
        const origen = this.state.saltoElegido[index];
        const newSaltos = this.state.newSaltos;
        if (!newSaltos[index]) {
            newSaltos[index] = []
        }
        if (newSaltos[index].findIndex(salto => salto.id !== origen.id) !== 1) {
            newSaltos[index].push(origen);
            const agregarSaltoDisabled = this.state.agregarSaltoDisabled;
            agregarSaltoDisabled[index] = true;
            this.setState({
                newSaltos,
                agregarSaltoDisabled
            })
        }
    }

    render() {
        const { tareasList } = this.props;

        return (
            <>
                {tareasList.map((tarea, index) =>
                    <Accordion key={index}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={index}>
                                {tarea.nombre}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                                <Card body>
                                    <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                        <FormCheckInput type={"checkbox"} disabled={this.state.tareasUbicadas.filter(ubicada => ubicada.id != tarea.id).length < 1}
                                            checked={this.state.inicialChecked[index]}
                                            onChange={() => this.onInicialChange(index)} name={"checkbox"} />
                                        <span>Inicial</span>
                                    </FormCheckLabel>
                                    {this.state.newSaltos[index] && this.state.newSaltos[index].map((salto, saltoIndex) =>
                                        <Card body key={index + "-" + saltoIndex}>
                                            Después de <b>{salto.name}</b>
                                        </Card>
                                    )}
                                    {!this.state.inicialChecked[index] && this.state.tareasUbicadas.filter(ubicada => {
                                        const saltos = this.state.newSaltos[index] ? this.state.newSaltos[index] : [];
                                        return ubicada.id != tarea.id && saltos.findIndex(el => el.id == ubicada.id) === -1;
                                    }).length > 0 &&
                                        <Card body>
                                            <span>Después de...</span>
                                            <Select options={this.state.tareasUbicadas.filter(ubicada => {
                                                const saltos = this.state.newSaltos[index] ? this.state.newSaltos[index] : [];
                                                return ubicada.id != tarea.id && (saltos.findIndex(el => el.id == ubicada.id) === -1);
                                            }
                                            )}
                                                placeholder={"Elegir..."} field={"nombre"} value={"id"} onChange={this.onSelectChange}
                                                name={index} defaultValue={""} />
                                            {//[TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_RECOLECCION].includes(tarea.tipo.id) &&
                                                true &&
                                                < FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                                    <FormCheckInput checked={this.state.condicionChecked[index]} type={"checkbox"}
                                                        onChange={() => this.onCondicionChange(tarea, index)} name={"checkbox"} />
                                                    <span>Condición</span>
                                                </FormCheckLabel>
                                            }
                                            {this.state.condicionChecked[index] &&
                                                <p>
                                                    <span>Cuando...</span>
                                                    <Select options={["se elige", "no se elige"]} />
                                                    <span>la opción</span>
                                                    <Select options={["Momo", "Dalia"]} />
                                                </p>
                                            }
                                            <Button variant={"info"} disabled={this.state.agregarSaltoDisabled[index]} onClick={() => this.onAgregarSalto(index)} className={"float-right"}>Agregar transición</Button>
                                        </Card>
                                    }
                                    {this.state.tareasUbicadas.filter(ubicada => ubicada.id === tarea.id).length === 0 ?
                                        <Button variant={"success"} style={{ marginTop: "1rem" }} onClick={() => this.onUbicarTarea(tarea)}
                                            className={"float-right"} disabled={!this.state.inicialChecked[index] && this.state.newSaltos[index].length === 0}>Ubicar tarea</Button>
                                        :
                                        <Button variant={"danger"} style={{ marginTop: "1rem" }} onClick={() => this.onQuitarTarea(tarea)}
                                            className={"float-right"}>Quitar tarea</Button>
                                    }
                                </Card>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )
                }
            </>
        )
    }
}

export default FlujoTareasPanel