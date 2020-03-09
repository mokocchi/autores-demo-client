import React from "react";
import userManager from "../../userManager";
import queryString from 'query-string'
import Login from "./Login";

class LoginContainer extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  error() {
    const values = queryString.parse(this.props.location.search)
    return values.error
  }

  render() {
    return (
      <Login onClick={this.onLoginButtonClick} error={this.error()}/>
    );
  }
}

export default LoginContainer;