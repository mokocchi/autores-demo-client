import React, { Component } from 'react';
import ActionList from './ActionList';
import tokenManager from '../../tokenManager';
import { InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';
import LoadSpinner from './LoadSpinner';

class SearchBar extends Component {
    state = {
        input: "",
        elements: [],
        isLoading: false,
        pages: 0,
        page: 1
    }

    getQueryString(extraQuery) {
        let queryString = "";
        Object.keys(extraQuery).forEach(element => {
            queryString = queryString + "&" + element + "=" + extraQuery[element]
        });
        return queryString;
    }

    equals = (object1, object2) => {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if(keys1.length !== keys2.length) {
            return false;
        }
        keys1.forEach(key => {
            if(object1[key] !== object2[key]) {
                return false;
            }
        });
        return true;
    }

    componentDidUpdate(prevProps) {
        if (!this.equals(this.props.extraQuery, prevProps.extraQuery) || (this.props.allResults !== prevProps.allResults)) {
            this.setState({pages: 0, page: 1})
            if (this.props.allResults) {
                this.getElements()
            } else {
                this.setState({
                    elements: []
                })
            }
        }
    }

    async getElements(query = "", page = "1") {
        const uri = this.props.uri + "?page=" + page + "&" + this.props.queryField + "=" + query + this.getQueryString(this.props.extraQuery);
        let data = null;
        this.setState({ isLoading: true });
        if (this.props.authorized) {
            data = await tokenManager.authorizedGetRequest(uri);
        } else {
            data = await tokenManager.publicGetRequest(uri);
        }
        this.setState({ isLoading: false });
        if (!data.error_code) {
            this.setState({
                elements: data.results,
            });
            if (this.state.pages === 0) {
                this.setState({
                    pages: Math.ceil(data.total / data.count)
                });
            }
        }
    }

    clearResults = () => {
        this.setState({
            input: "",
            elements: [],
            page: 1,
            pages: 0
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

    getPages = () => {
        const pages = []
        for (let index = 1; index <= this.state.pages; index++) {
            pages.push(index);
        }
        return pages;
    }

    onClickPage = (page) => {
        this.getElements(this.props.query, page);
        this.setState({
            page: page
        });
    }

    render() {
        return (
            <div>
                {
                    !this.props.allResults &&
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
                }
                {!this.state.isLoading &&
                    <>
                        <ActionList items={this.state.elements} field="nombre" value="id"
                            action={{ variant: "info", label: "Ver" }} onClick={this.props.onSelect} onSelect={this.props.onSelect} />
                        {this.state.elements.length !== 0 &&
                            <Pagination>
                                {this.state.page > 1 &&
                                    <Pagination.First onClick={() => this.onClickPage(1)} />
                                }
                                {this.state.page > 2 &&
                                    <Pagination.Prev onClick={() => this.onClickPage(this.state.page - 1)} />
                                }
                                {this.state.pages > 10 &&
                                    < Pagination.Ellipsis />
                                }
                                {this.getPages().map(number =>
                                    (
                                        <Pagination.Item key={number} active={number === this.state.page} onClick={() => this.onClickPage(number)}>
                                            {number}
                                        </Pagination.Item>
                                    )
                                )}
                                {this.state.pages > 10 &&
                                    < Pagination.Ellipsis />
                                }
                                {(this.state.page < (this.state.pages - 1)) &&
                                    <Pagination.Next onClick={() => this.onClickPage(this.state.page + 1)} />
                                }
                                {this.state.page < this.state.pages &&
                                    <Pagination.Last onClick={() => this.onClickPage(this.state.pages)} />
                                }
                            </Pagination>
                        }
                    </>
                }
            </div>
        )
    }
}

export default SearchBar;