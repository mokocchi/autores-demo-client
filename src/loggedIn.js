import React, { Component } from "react";
import { connect } from "react-redux";

import LoginPage from './LoginPage'

function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}
export default function loggedIn(WrappedComponent, data) {
    return connect(mapStateToProps)(
        class extends Component {
            render() {
                return (
                    !this.props.token ?
                        <LoginPage />
                        :
                        <WrappedComponent {...this.props} />
                )
            }
        }
    )
}