import React, { Component } from 'react';

import TareaSearch from './Search';

class TareaSearchContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            criterionId: ""
        }
    }

    onChange = (e) => {
        this.setState({
            criterionId: e.target.value
        })
    }

    render() {
        return <TareaSearch onChange={this.onChange} criterionId={this.state.criterionId}/>
    }
}

export default TareaSearchContainer;