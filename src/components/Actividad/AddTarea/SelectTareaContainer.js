import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTarea } from '../../../redux/actions'

import tokenManager from '../../../tokenManager';
import AddTareasSelectTarea from './SelectTarea';

class AddTareasSelectTareaContainer extends Component {

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
        this.onSelect = this.onSelect.bind(this);
    }

    async onSelect(selected) {
        let tarea = this.state.tareasCache[selected.id];
        if (tarea) {
            this.setState({
                selectedTarea: tarea
            })
        } else {
            tarea = await tokenManager.getTarea(selected.id);
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
            this.setState({
                selectedTarea: {
                    nombre: "",
                    id: ""
                }
            })
        }
    }

    render() {
        return (
            <AddTareasSelectTarea actividadId={this.props.actividadId} onSelect={this.onSelect} onClick={this.onClick}
                selectedTarea={this.state.selectedTarea} disabled={this.state.selectedTarea.id === "" || (this.props.clone ? this.props.disabled : false)} />
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