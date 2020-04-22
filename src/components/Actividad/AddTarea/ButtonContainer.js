import React, { Component } from 'react';
import { connect } from 'react-redux';

import tokenManager from '../../../tokenManager';
import AddTareasButton from './Button';

class AddTareasButtonContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            success: false,
            error: false,
            errorMessage: ""
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async setTareasToActividad(id, tareasIds) {
        this.setState({
            isLoading: true
        })
        const data = await tokenManager.setTareasToActividad({
            "tareas": tareasIds
        }, id)
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message,
                success: false,
                isLoading: false
            })
            return;
        } else {
            //finish only if not cloning
            this.setState({ success: !this.props.clone, isLoading: this.props.clone });
        }
    }

    getNewPlanificacion() {
        const { chosenTareas, clonedTareas, clonedPlanificacion } = this.props;
        const chosenById = {};
        const chosenByCode = {};
        for (let index = 0; index < chosenTareas.length; index++) {
            chosenById[clonedTareas[index].id] = chosenTareas[index].id;
            chosenByCode[clonedTareas[index].codigo] = chosenTareas[index].code;
        }
        const opcionales = clonedPlanificacion.opcionales_ids.map(id => {
            return chosenById[id];
        })
        const iniciales = clonedPlanificacion.iniciales_ids.map(id => {
            return chosenById[id];
        })
        const saltos = clonedPlanificacion.saltos.map(salto => {
            const destinos = salto.destino_ids.map(dest => chosenById[dest]);
            const respuesta = ["YES_TASK", "NO_TASK"].includes(salto.condicion) ? chosenByCode[salto.respuesta] : salto.respuesta
            return {
                origen: chosenById[salto.origen_id],
                condicion: salto.condicion,
                destinos: destinos,
                respuesta: respuesta
            }
        })
        return {
            saltos: saltos,
            iniciales: iniciales,
            opcionales: opcionales
        }

    }

    async setClonedPlanificacion(id) {
        const planificacion = this.getNewPlanificacion();
        const data = await tokenManager.setPlanificacionInActividad(planificacion, id);
        if (data.error_code) {
            this.setState({
                error: true,
                errorMessage: data.user_message,
                success: false,
                isLoading: false
            })
            return;
        } else {
            this.setState({ success: true, isLoading: false });
        }
    }

    async handleFormSubmit() {
        const id = this.props.actividadId;
        const tareasIds = this.props.chosenTareas.map(tarea => tarea.id);
        if (tareasIds.length === 0) {
            this.setState({
                error: true,
                errorMessage: "No se eligieron tareas"
            });
            return;
        }
        if (this.props.disabled) {
            this.setState({
                error: true,
                errorMessage: "Faltan tareas"
            });
        }
        await this.setTareasToActividad(id, tareasIds);
        if (this.props.clone) {
            await this.setClonedPlanificacion(id);
        }
    }

    render() {
        return (
            <AddTareasButton isLoading={this.state.isLoading} success={this.state.success} actividadId={this.props.actividadId} disabled={this.props.disabled}
                onSubmit={this.handleFormSubmit} error={this.state.error} errorMessage={this.state.errorMessage} bifurcada={this.props.bifurcada}
            />
        )
    }

}

function mapStateToProps(state) {
    const { chosenTareas } = state.actividadTareas;
    return {
        chosenTareas
    }
}
export default connect(mapStateToProps)(AddTareasButtonContainer);