import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddTareasActionList from './TareasActionList';
import { unchooseTarea } from '../../../redux/actions';

class AddTareasActionListContainer extends Component {

    onClick = (item) => {
        this.props.dispatch(unchooseTarea(item.id));
    }

    render() {
        return <AddTareasActionList chosenTareas={this.props.chosenTareas} onClick={this.onClick} />
    }
}

function mapStateToProps(state) {
    const { actividadTareas } = state
    const { chosenTareas } = actividadTareas;

    return {
        chosenTareas
    }
}

export default connect(mapStateToProps)(AddTareasActionListContainer);