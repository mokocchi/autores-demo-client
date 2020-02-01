import React from "react";
import userManager from "./userManager";
import { Button } from "react-bootstrap";

class LoginPage extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <div style={styles.root}>
        <h3>Bienvienido a AutoresDemo</h3>
        <p>Iniciá sesión para continuar</p>
        <Button onClick={this.onLoginButtonClick}>Iniciar sesión con Google</Button>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    flexShrink: 1
  }
};

export default LoginPage;