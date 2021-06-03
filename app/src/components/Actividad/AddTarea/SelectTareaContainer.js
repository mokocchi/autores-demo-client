import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTarea } from '../../../redux/actions'

import AddTareasSelectTarea from './SelectTarea';
import { TIPOS_OPCIONES } from '../../../config';

class AddTareasSelectTareaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTarea: {
                nombre: "",
                id: ""
            },
            opciones: false,
            todas: false,
            showModal: false
        }
        this.onClick = this.onClick.bind(this);
    }

    onSelect = (selected) => {
        this.setState({
            selectedTarea: selected,
            showModal: true
        })
    }

    onClick() {
        const tarea = this.state.selectedTarea;
        const referenced = this.props.referencedTareas.find(item => this.props.nextTarea.id === item);
        if(referenced && !TIPOS_OPCIONES.includes(tarea.tipo.id.toString())) {
            alert("La tarea de reemplazo tiene que tener opciones");
            this.setState({
                showModal: false
            })
            return;
        }
        if (tarea.id !== "") {
            this.props.dispatch(addTarea(tarea));
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

    toggleShowModal = () => this.setState({showModal: !this.state.showModal});

    render() {
        return (
            <AddTareasSelectTarea actividadId={this.props.actividadId} onSelect={this.onSelect} onClick={this.onClick} clone={this.props.clone}
                selectedTarea={this.state.selectedTarea} opciones={this.state.opciones} todas={this.state.todas}
                onOpcionesChange={this.onOpcionesChange} onTodasChange={this.onTodasChange}
                disabled={this.state.selectedTarea.id === "" || (this.props.clone ? this.props.disabled : false)}
                showModal={this.state.showModal} toggleShowModal={this.toggleShowModal}
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