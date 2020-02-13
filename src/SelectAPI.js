import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestOptions, receiveOptions, failAttribute } from './redux/actions'

import Select from './Select';
import LoadSpinner from './LoadSpinner';
import { API_BASE_URL } from './config'
import tokenManager from './tokenManager';

class SelectAPI extends Component {

    componentDidMount() {
        this.getElements();
    }

    async getElements() {
        const { dispatch, optionsByAttribute, attribute } = this.props
        if (!optionsByAttribute[attribute]) {
            try {
                dispatch(requestOptions(attribute));
                const data = await tokenManager.publicGetRequest(this.props.uri);
                if (data.errors) {
                    dispatch(failAttribute(attribute))
                } else {
                    dispatch(receiveOptions(attribute, data))
                }
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
                    <LoadSpinner />
                }
                {optionsByAttribute[attribute] && !optionsByAttribute[attribute].isFetching && optionsByAttribute[attribute].items !== [] &&
                    <Select
                        controlId={this.props.controlId}
                        label={this.props.label}
                        name={this.props.name}
                        options={optionsByAttribute[attribute].items}
                        defaultValue={this.props.defaultValue}
                        value={"id"}
                        field={"nombre"}
                        placeholder={this.props.placeholder}
                        onPropsChangeMore={this.props.onPropsChangeMore}
                        onChange={this.props.onChange} />
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

