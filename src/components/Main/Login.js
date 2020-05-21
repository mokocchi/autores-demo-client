import React from "react";
import { Button, Form } from "react-bootstrap";

const Login = (props) => {
  return (
    <div style={styles.root}>
      <h3>Bienvienido a DEHIA</h3>
      <p>Iniciá sesión para continuar</p>
      <Button onClick={props.onClick} variant={"outline-dark"} data-cy={"iniciarSesionButton"} role="button" style={{ textTransform: "none" }}>
        <img width="20px" style={{ marginBotton: "3px", marginRight: "5px" }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Iniciar sesión con Google
      </Button>
      {props.error && <Form.Text className="text-danger">Ocurrió un error</Form.Text>}
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