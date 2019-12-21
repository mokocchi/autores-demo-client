import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
                <ActionList items={chosenTareas} action={true} onClick={this.onClick} field={"nombre"} value={"id"}/>
                <Button variant="primary" type="button" onClick={this.handleFormSubmit} style={{marginTop: "1em"}}>Continuar</Button>
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