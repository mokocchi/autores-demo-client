import React, { Component } from 'react';

import Select from './Select';
import LoadSpinner from './LoadSpinner';

class SelectAPI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: null,
            isLoading: null
        };
    }

    componentDidMount() {
        this.getElements();
    }

    async getElements() {
        if (!this.state.elements) {
            try {
                this.setState({ isLoading: true });
                const response = await fetch(this.props.url);
                const data = await response.json();
                this.setState({ elements: data, isLoading: false });
                this.props.onLoad && this.props.onLoad(data);
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading &&
                    <LoadSpinner/>
                }
                {this.state.elements &&
                    <Select
                        controlId={this.props.controlId}
                        label={this.props.label}
                        name={this.props.name}
                        options={this.state.elements}
                        value={this.props.value}
                        placeholder={this.props.placeholder} />
                }
            </div>
        )
    }
}

export default SelectAPI;

