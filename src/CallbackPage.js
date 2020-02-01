import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "./userManager";

class CallbackPage extends React.Component {
    render() {
        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={() => { this.props.history.push("/") }}
                errorCallback={error => {
                    this.props.history.push("/");
                    console.error(error);
                }}
            >
                <div>Redirecting...</div>
            </CallbackComponent>
        );
    }
}

export default connect()(CallbackPage);