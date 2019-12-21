import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { InputGroup, Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectTarea, chooseTarea, setCurrentActividad } from './redux/actions'

import Select from './Select'
import { API_BASE_URL } from './config'

class TareaSearchResult extends Component {

    constructor(props) {
        super(props);
        let id = this.props.actividadId;
        this.setCurrentActividad(id);
    }

    async setCurrentActividad(id) {
        const response = await fetch(API_BASE_URL + '/actividad/' + id);
        const data = await response.json();
        this.props.dispatch(setCurrentActividad(data));
    }

    onChange = (e) => {
        this.props.dispatch(selectTarea(e.target.value));
    }

    onClick = (e) => {
        const { dispatch, selectedTareaId } = this.props;
        selectedTareaId !== "" && dispatch(chooseTarea())
    }

    render() {
        const { tareasResult, selectedTareaId } = this.props;
        return (
            <Col>
                <h4>Resultados</h4>
                <InputGroup>
                    <Select
                        defaultValue={""}
                        placeholder={"Elegí una tarea"}
                        value={"id"}
                        field={"nombre"}
                        options={tareasResult}
                        onChange={this.onChange}
                    />
                    <span>
                        <Button variant="info" type="button" onClick={this.onClick} disabled={selectedTareaId === ""} >
                            Agregar
                        </Button>
                    </span>
                </InputGroup>
                <Link to={"/actividad/" + this.props.actividadId + "/nuevaTarea"} >
                    <Button variant="success" type="button">Nueva tarea</Button>
                </Link>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    const { actividadTareas } = state
    const { tareasResult, selectedTareaId } = actividadTareas;

    return {
        tareasResult, selectedTareaId
    }
}

export default connect(mapStateToProps)(TareaSearchResult);