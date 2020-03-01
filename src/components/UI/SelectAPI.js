import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestOptions, receiveOptions, failAttribute } from '../../redux/actions'

import Select from './Select';
import LoadSpinner from './LoadSpinner';
import tokenManager from '../../tokenManager';

class SelectAPI extends Component {

    componentDidMount() {
        this.getElements();
    }

    async getElements() {
        const { dispatch, optionsByAttribute, attribute, authorized } = this.props
        if (!optionsByAttribute[attribute]) {
            try {
                dispatch(requestOptions(attribute));
                let data = null;
                if (authorized) {
                    data = await tokenManager.authorizedGetRequest(this.props.uri);
                } else {
                    data = await tokenManager.publicGetRequest(this.props.uri);
                }
                if (data.error_code) {
                    dispatch(failAttribute(attribute))
                } else {
                    dispatch(receiveOptions(attribute, data.results))
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
                        error={optionsByAttribute[attribute].error}
                        controlId={this.props.controlId}
                        label={this.props.label}
                        name={this.props.name}
                        options={optionsByAttribute[attribute].items}
                        defaultValue={this.props.defaultValue}
                        value={"id"}
                        field={"nombre"}
                        placeholder={this.props.placeholder}
                        onPropsChangeMore={this.props.onPropsChangeMore}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
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

