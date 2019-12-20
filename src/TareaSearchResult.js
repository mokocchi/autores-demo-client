import React, { Component } from 'react';
import { InputGroup, Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectTarea, chooseTarea } from './redux/actions'

import Select from './Select'

class TareaSearchResult extends Component {

    onChange = (e) => {
        this.props.dispatch(selectTarea(e.target.value));        
    }

    onClick = (e) => {
        const { dispatch, selectedTareaId } = this.props;
        selectedTareaId !== "" && dispatch(chooseTarea())
    }

    render() {
        const { tareasResult } = this.props;
        return (
            <Col>
                <h4>Resultados</h4>
                <InputGroup>
                    <Select
                        value={""}
                        placeholder={"Elegí una tarea"}
                        options={tareasResult}
                        onChange={this.onChange}
                    />
                    <span>
                        <Button variant="success" type="button" onClick={this.onClick}>
                            Agregar
                        </Button>
                    </span>
                </InputGroup>
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