import React from "react";
import { connect } from "react-redux";
import { CallbackComponent, userSignedOut } from "redux-oidc";
import userManager from "./userManager";
import { apiUserFound } from "./redux/actions";
import LoadSpinner from "./LoadSpinner";
import tokenManager from "./tokenManager";

class CallbackPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
    }

    async onSuccess () {
        const token = await tokenManager.fetchApiUser(this.props.user.id_token);
        alert(token);
        if (!token) {
            this.props.dispatch(userSignedOut());
        } else {
            this.props.dispatch(apiUserFound(token));
            tokenManager.storeApiUser(token);
        }
        this.props.history.push("/")
    }

    onError = (error) => {
        this.props.history.push("/");
        console.error(error);
    }
    render() {
        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={this.onSuccess}
                errorCallback={this.onError}
            >
                <LoadSpinner />
            </CallbackComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.oidc.user
    }
}
export default connect(mapStateToProps)(CallbackPage);