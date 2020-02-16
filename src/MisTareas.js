import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { addTarea } from './redux/actions'

import SelectAPI from './SelectAPI';
import { API_BASE_URL } from './config'
import tokenManager from './tokenManager';

class MisTareas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTarea: {
                nombre: "",
                id: ""
            },
            tareasCache: {}
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async onChange(e) {
        let tarea = this.state.tareasCache[e.target.value];
        if (tarea) {
            this.setState({
                selectedTarea: tarea
            })
        } else {
            tarea = await tokenManager.getTarea(e.target.value);
            if (!tarea.error_code) {
                const tareasCache = this.state.tareasCache;
                tareasCache[tarea.id] = tarea;
                this.setState({
                    selectedTarea: tarea,
                    tareasCache
                })
            }

        }
    }

    onClick(e) {
        if (this.state.selectedTarea.id !== "") {
            this.props.dispatch(addTarea(this.state.selectedTarea));
        }
    }

    render() {
        const { currentActividad } = this.props
        return (
            <>
                <h2>Mis tareas{" "}
                    <Link to={"/actividad/" + currentActividad.id + "/nuevaTarea"} >
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
                            onChange={this.onChange}
                        />
                    </Col>
                    <Col sm={2}>
                        <span>
                            <Button className="float-left" variant="info" type="button"
                                onClick={this.onClick} disabled={this.state.selectedTarea.id === ""} >
                                Agregar
                            </Button>
                        </span>
                    </Col>
                    <Col>Consigna:<br />{this.state.selectedTarea && <span>{this.state.selectedTarea.consigna}</span>}</Col>
                </Row>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { currentActividad } = state.actividad
    return {
        currentActividad
    }
}

export default connect(mapStateToProps)(MisTareas);