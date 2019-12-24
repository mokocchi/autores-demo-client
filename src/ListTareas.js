import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unchooseTarea } from './redux/actions'

import ActionList from './ActionList';

class ListTareas extends Component {

    onClick = (item) => {
        this.props.dispatch(unchooseTarea(item.id));
    }

    render() {
        const { chosenTareas } = this.props;
        return (
            <div>
                <h2>Tareas de la actividad</h2>
                <ActionList items={chosenTareas} action={true} onClick={this.onClick} field={"nombre"} value={"id"}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { actividadTareas } = state
    const { chosenTareas } = actividadTareas;
  
    return {
        chosenTareas
    }
  }

export default connect(mapStateToProps)(ListTareas);