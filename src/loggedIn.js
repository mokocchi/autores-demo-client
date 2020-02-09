import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router";

function mapStateToProps(state) {
    return {
        user: state.oidc.user
    }
}
export default function loggedIn(WrappedComponent, data) {
    return connect(mapStateToProps)(
        class extends Component {
            render() {
                return (
                    this.props.user?
                    <WrappedComponent/> : <Redirect to="/"/>
                )
            }
        }
    )
}