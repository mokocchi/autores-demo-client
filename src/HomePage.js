import React from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import Main from "./Main";

function HomePage(props) {
  const { user } = props;

  return !user || user.expired ? <LoginPage /> : <Main />;
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);