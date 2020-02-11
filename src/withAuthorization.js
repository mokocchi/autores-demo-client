import React from "react";
import { connect } from "react-redux";
import Unauthorized from "./Unauthorized";

function mapStateToProps(state) {
  return {
    role: state.auth.role
  };
}

export default allowedRoles => WrappedComponent => {
  return connect(mapStateToProps)((props) =>
    allowedRoles.includes(props.role) ? <WrappedComponent {...props} /> : <Unauthorized />
  );
};
