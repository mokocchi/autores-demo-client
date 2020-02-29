import React from "react";
import { connect } from "react-redux";
import LoginContainer from "./containers/LoginContainer";

function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}
export default (WrappedComponent) => {
    return connect(mapStateToProps)((props) =>
        props.token.accessToken ?
            < WrappedComponent {...props} />
            :
            <LoginContainer />
    )
}