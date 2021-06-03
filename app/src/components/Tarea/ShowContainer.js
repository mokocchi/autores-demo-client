import React, { Component } from 'react';

import { TIPOS_PLANO, PLANOS_URL } from '../../config';
import tokenManager from '../../tokenManager';
import TareaShow from './Show';

class TareaShowContainer extends Component {

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
        let data = null;
        if (tokenManager.isAuthorized()) {
            data = await tokenManager.getTarea(this.props.actividadId)
        } else {
            data = await tokenManager.getTareaPublic(this.props.actividadId)
        }
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
        if (this.state.tarea) {
            imgSrc = TIPOS_PLANO.includes(this.state.tarea.tipo.id.toString()) ? PLANOS_URL + "/" + this.state.tarea.codigo + ".png" : null
        }
        return <TareaShow tarea={this.state.tarea} errors={this.state.errors} imgSrc={imgSrc} />
    }
}

export default TareaShowContainer;