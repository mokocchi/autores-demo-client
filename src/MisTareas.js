import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { addTarea } from './redux/actions'

import SelectAPI from './SelectAPI';

class MisTareas extends Component {

    state = {
        selectedTarea: {
            nombre: "",
            id: ""
        }
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

    onClick = (e) => {
        this.state.selectedTarea.id !== "" && this.props.dispatch(addTarea(this.state.selectedTarea))
    }

    render() {
        return (
            <>
                <h2>Mis tareas{" "}
                    <Link to={"/actividad/" + this.props.actividadId + "/nuevaTarea"} >
                        <Button variant="success" type="button">Nueva</Button>
                    </Link>
                </h2>
                <Row>
                    <Col>
                        <SelectAPI
                            uri={'/tarea'}
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
    return {
        
    }
}

export default connect(mapStateToProps)(MisTareas);