import React from "react";
import { connect } from "react-redux";
import Unauthorized from "./Unauthorized";
import loggedIn from "./loggedIn";

function mapStateToProps(state) {
  return {
    role: state.auth.role,
    isLoading: state.auth.isLoading
  };
}

export default allowedRoles => WrappedComponent => {
  return loggedIn(connect(mapStateToProps)((props) =>
    props.isLoading ? <span>Cargando...</span> :
      allowedRoles.includes(props.role) ? <WrappedComponent {...props} /> : <Unauthorized />
  ));
};
