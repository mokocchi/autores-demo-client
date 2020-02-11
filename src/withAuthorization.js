import React from "react";
import { connect } from "react-redux";
import Unauthorized from "./Unauthorized";

function mapStateToProps(state) {
  return {
    role: state.auth.role
  };
}

export default allowedRoles => WrappedComponent => {
  return connect(mapStateToProps)(({ role }) =>
    allowedRoles.includes(role) ? <WrappedComponent /> : <Unauthorized />
  );
};
