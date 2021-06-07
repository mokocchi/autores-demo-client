import React from "react";
import { connect } from "react-redux";
import Unauthorized from "./Unauthorized";
import loggedIn from "./loggedIn";

function mapStateToProps(state) {
  return {
    roles: state.auth.roles,
    isLoading: state.auth.isLoading
  };
}

function isAllowed(roles, allowedRoles) {
  let allowed = false;
  roles.forEach(role => {
    if(allowedRoles.includes(role)) {
      allowed = true;
      return;
    }
  });
  return allowed;
}

const wa = allowedRoles => WrappedComponent => {
  return loggedIn(connect(mapStateToProps)((props) =>
    props.isLoading ? <span>Cargando...</span> :
      isAllowed(props.roles, allowedRoles) ? <WrappedComponent {...props} /> : <Unauthorized />
  ));
};

export default wa;
