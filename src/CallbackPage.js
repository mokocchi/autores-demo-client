import React from "react";
import { connect } from "react-redux";
import { CallbackComponent, userSignedOut } from "redux-oidc";
import userManager from "./userManager";
import { apiUserFound, loadingApiUser } from "./redux/actions";
import LoadSpinner from "./LoadSpinner";
import tokenManager from "./tokenManager";

class CallbackPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
    }

    async onSuccess () {
        this.props.dispatch(loadingApiUser());
        const auth = await tokenManager.fetchAuth(this.props.user.id_token);
        if (!auth) {
            this.props.dispatch(userSignedOut());
        } else {
            this.props.dispatch(apiUserFound(auth));
            tokenManager.storeApiUser(auth);
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