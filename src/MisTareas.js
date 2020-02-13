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
            }
        }
        this.onClick = this.onClick.bind(this);
    }

    onChange = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        const nombre = e.nativeEvent.target[index].text
        const tarea = {
            nombre: nombre,
            id: e.target.value
        }
        this.setState({
            selectedTarea: tarea
        })
    }

    async onClick(e) {
        if (this.state.selectedTarea.id !== "") {
            const data = await tokenManager.getTarea(this.state.selectedTarea.id);
            if(!data.errors){
                this.props.dispatch(addTarea(data));
            }
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
                    <Col>
                        <span>
                            <Button className="float-left" variant="info" type="button"
                                onClick={this.onClick} disabled={this.state.selectedTarea.id === ""} >
                                Agregar
                            </Button>
                        </span>
                    </Col>
                    <Col></Col>
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