import React from "react";
import userManager from "../userManager";
import Login from "../components/Login";

class LoginContainer extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <Login onClick={this.onLoginButtonClick} />
    );
  }
}

export default LoginContainer;