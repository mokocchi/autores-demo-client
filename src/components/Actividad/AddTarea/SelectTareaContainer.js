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
        return (
            <AddTareasSelectTarea actividadId={this.props.actividadId} onChange={this.onChange} onClick={this.onClick}
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