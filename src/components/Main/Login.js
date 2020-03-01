import React from "react";
import { Button } from "react-bootstrap";

const Login = (props) => {
  return (
    <div style={styles.root}>
      <h3>Bienvienido a AutoresDemo</h3>
      <p>Iniciá sesión para continuar</p>
      <Button onClick={props.onClick}>Iniciar sesión con Google</Button>
    </div>
  );
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

export default Login;