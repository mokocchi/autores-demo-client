import React from "react";
import { CallbackComponent } from "redux-oidc";
import LoadSpinner from "../LoadSpinner";

const Callback = (props) => {
    return (
        <CallbackComponent
            userManager={props.userManager}
            successCallback={props.successCallback}
            errorCallback={props.errorCallback}
        >
            <LoadSpinner />
        </CallbackComponent>
    );
}

export default Callback;