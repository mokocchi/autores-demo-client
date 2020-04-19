import React, { Component } from 'react';
import ActionList from './ActionList';
import tokenManager from '../../tokenManager';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import LoadSpinner from './LoadSpinner';

class SearchBar extends Component {
    state = {
        input: "",
        elements: [],
        isLoading: false
    }

    async getElements(query) {
        const uri = this.props.uri + "?nombre=" + query;
        let data = null;
        this.setState({isLoading: true});
        if (this.props.authorized) {
            data = await tokenManager.authorizedGetRequest(uri);
        } else {
            data = await tokenManager.publicGetRequest(uri);
        }
        this.setState({isLoading: false});
        if (!data.error_code) {
            this.setState({
                elements: data.results
            });
        }
    }

    clearResults = () => {
        this.setState({
            input: "",
            elements: []
        })
    }

    onChange = e => {
        const input = e.target.value;
        this.setState({
            input: input
        })
        if (input.length >= 3) {
            this.getElements(input);
        }
    }
    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <FormControl type="text" value={this.state.input} placeholder={this.props.placeholder}
                        onChange={this.onChange} />
                    <InputGroup.Append>
                        {this.state.isLoading ?
                            <LoadSpinner />
                            :
                            <Button variant="secondary" type="button" onClick={this.clearResults}>
                                Limpiar
                            </Button>
                        }
                    </InputGroup.Append>
                </InputGroup>
                <ActionList items={this.state.elements} field="nombre" value="id"
                    action={{ variant: "info", label: "Ver" }} onClick={this.props.onSelect} onSelect={this.props.onSelect} />
            </div>
        )
    }
}

export default SearchBar;