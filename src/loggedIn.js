import React, { Component } from "react";
import { connect } from "react-redux";

import LoginPage from './LoginPage'

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
                    !this.props.user || this.props.user.expired ?
                        <LoginPage />
                        :
                        <WrappedComponent {...this.props} />
                )
            }
        }
    )
}