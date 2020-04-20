import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTarea } from '../../../redux/actions'

import AddTareasSelectTarea from './SelectTarea';

class AddTareasSelectTareaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTarea: {
                nombre: "",
                id: ""
            },
            opciones: false,
            todas: false
        }
        this.onClick = this.onClick.bind(this);
    }

    onSelect = (selected) => {
        this.setState({
            selectedTarea: selected
        })
    }

    onClick(e) {
        if (this.state.selectedTarea.id !== "") {
            this.props.dispatch(addTarea(this.state.selectedTarea));
            this.setState({
                selectedTarea: {
                    nombre: "",
                    id: ""
                }
            })
        }
    }

    onOpcionesChange = () => {
        this.setState({
            opciones: !this.state.opciones
        });
    }

    onTodasChange = () => {
        this.setState({
            todas: !this.state.todas
        });
    }

    render() {
        return (
            <AddTareasSelectTarea actividadId={this.props.actividadId} onSelect={this.onSelect} onClick={this.onClick} clone={this.props.clone}
                selectedTarea={this.state.selectedTarea} opciones={this.state.opciones} todas={this.state.todas}
                onOpcionesChange={this.onOpcionesChange} onTodasChange={this.onTodasChange}
                disabled={this.state.selectedTarea.id === "" || (this.props.clone ? this.props.disabled : false)}
            />
        )
    }
}

function mapStateToProps(state) {
    const { currentActividad } = state.actividad
    return {
        currentActividad
    }
}

export default connect(mapStateToProps)(AddTareasSelectTareaContainer);