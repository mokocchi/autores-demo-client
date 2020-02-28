import React, { Component } from "react";
import { connect } from "react-redux";
import LoginContainer from "./containers/LoginContainer";

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
                    !this.props.token.accessToken ?
                        <LoginContainer />
                        :
                        <WrappedComponent {...this.props} />
                )
            }
        }
    )
}