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
            tareasUbicadas: []
        }
    }

    onInicialChange = (inicialIndex) => {
        this.setState({
            inicialChecked: this.state.inicialChecked.map((item, index) =>
                (index !== inicialIndex) ? this.state.inicialChecked[index] : !this.state.inicialChecked[index])
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
    }

    onQuitarTarea = (tareaPorQuitar) => {
        this.setState({
            tareasUbicadas: this.state.tareasUbicadas.filter(tarea => tarea.id !== tareaPorQuitar.id)
        })
    }

    render() {
        const { tareasList } = this.props;

        return (
            <>
                {tareasList.map((tarea, index) =>
                    <Accordion key={1}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={1}>
                                {tarea.nombre}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1}>
                                <Card body>
                                    <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                        <FormCheckInput type={"checkbox"} disabled={this.state.tareasUbicadas.length <= 1 }
                                            checked={this.state.inicialChecked[index]}
                                            onChange={() => this.onInicialChange(index)} name={"checkbox"} />
                                        <span>Inicial</span>
                                    </FormCheckLabel>
                                    {!this.state.inicialChecked[index] && this.state.tareasUbicadas.length > 1 &&
                                        <Card body>
                                            <span>Después de...</span>
                                            <Select options={this.state.tareasUbicadas.filter(ubicada => ubicada.id != tarea.id)} field={"nombre"} value={"id"} />
                                            {//[TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_RECOLECCION].includes(tarea.tipo.id) &&
                                            true &&
                                                < FormCheckLabel style={{ marginLeft: "1.25rem" }}>
                                                    <FormCheckInput checked={this.state.condicionChecked[index]} type={"checkbox"}
                                                        onChange={() => this.onCondicionChange(index)} name={"checkbox"} />
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
                                            <Button variant={"info"} className={"float-right"}>Agregar transición</Button>
                                        </Card>
                                    }
                                    {this.state.tareasUbicadas.filter(ubicada => ubicada.id === tarea.id).length === 0 ?
                                        <Button variant={"success"} style={{ marginTop: "1rem" }} onClick={() => this.onUbicarTarea(tarea)}
                                            className={"float-right"}>Ubicar tarea</Button>
                                        :
                                        <Button variant={"danger"} style={{ marginTop: "1rem" }} onClick={() => this.onQuitarTarea(tarea)}
                                            className={"float-right"}>Quitar tarea</Button>
                                    }
                                </Card>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )}
            </>
        )
    }
}

export default FlujoTareasPanel