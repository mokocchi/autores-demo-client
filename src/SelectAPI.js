import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestOptions, receiveOptions, failAttribute } from './redux/actions'

import Select from './Select';
import LoadSpinner from './LoadSpinner';

class SelectAPI extends Component {

    componentDidMount() {
        this.getElements();
    }

    async getElements() {
        const { dispatch, optionsByAttribute, attribute } = this.props
        if (!optionsByAttribute[attribute]) {
            try {
                dispatch(requestOptions(attribute));
                const response = await fetch(this.props.url);
                const data = await response.json();
                dispatch(receiveOptions(attribute, data))
            } catch (err) {
                dispatch(failAttribute(attribute))                
                console.error(err);
            }
        }
    }

    render() {
        const { optionsByAttribute, attribute } = this.props;
        return (
            <div>
                {optionsByAttribute[attribute] && optionsByAttribute[attribute].isFetching &&
                    <LoadSpinner/>
                }
                {optionsByAttribute[attribute] && !optionsByAttribute[attribute].isFetching && optionsByAttribute[attribute].items !== [] &&
                    <Select
                        controlId={this.props.controlId}
                        label={this.props.label}
                        name={this.props.name}
                        options={optionsByAttribute[attribute].items}
                        value={this.props.value}
                        placeholder={this.props.placeholder} />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { optionsByAttribute } = state
  
    return {
        optionsByAttribute
    }
  }

export default connect(mapStateToProps)(SelectAPI);

