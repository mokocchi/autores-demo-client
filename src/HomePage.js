import React from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import Main from "./Main";

function HomePage(props) {
  const { user, accessToken } = props;

  return !user || user.expired || !accessToken ? <LoginPage /> : <Main />;
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    accessToken: state.auth.token.accessToken
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);