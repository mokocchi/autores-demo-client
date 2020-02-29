import React, { Component } from 'react';

import { TIPOS_PLANO } from '../config';
import tokenManager from '../tokenManager';
import ShowTarea from '../components/ShowTarea';

class ShowTareaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tarea: null,
            errors: false
        }
        this.getTarea = this.getTarea.bind(this);
        this.getTarea();
    }

    async getTarea() {
        const data = await tokenManager.getTareaPublic(this.props.match.params.id)
        if (!data.error_code) {
            this.setState({
                tarea: data
            })
        } else {
            this.setState({
                errors: true
            })
        }
    }

    render() {
        let imgSrc = null;
        if(this.state.tarea) {
            imgSrc = TIPOS_PLANO.includes(this.state.tarea.tipo.id.toString()) ? "http://localhost:8080/uploads/planos/" + this.state.tarea.codigo + ".png" : null
        }
        return <ShowTarea tarea={this.state.tarea} errors={this.state.errors} imgSrc={imgSrc} />
    }
}

export default ShowTareaContainer;