import React from "react";
import { connect } from "react-redux";
import LoadSpinner from "../UI/LoadSpinner";
import LoginContainer from "./LoginContainer";

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        oidc: state.auth
    }
}

const loggedIn = (WrappedComponent) => {
    return connect(mapStateToProps)((props) =>
        props.token.isLoading || props.oidc.isLoading ?
            <LoadSpinner /> 
            :
            props.token.accessToken ?
                < WrappedComponent {...props} />
                :
                <LoginContainer {...props} />
    )
}
export default loggedIn;