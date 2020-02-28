import React from "react";
import { connect } from "react-redux";
import { userSignedOut } from "redux-oidc";
import userManager from "../userManager";
import { apiUserFound, loadingApiUser } from "../redux/actions";
import tokenManager from "../tokenManager";
import Callback from "../components/Callback";

class CallbackContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
    }

    async onSuccess() {
        this.props.dispatch(loadingApiUser());
        const auth = await tokenManager.fetchAuth(this.props.user.id_token);
        if (!auth) {
            this.props.dispatch(userSignedOut());
        } else {
            this.props.dispatch(apiUserFound(auth));
            tokenManager.storeApiUser(auth.token);
        }
        this.props.history.push("/")
    }

    onError = (error) => {
        this.props.history.push("/");
        console.error(error);
    }
    render() {
        return (
            <Callback
                userManager={userManager}
                successCallback={this.onSuccess}
                errorCallback={this.onError}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.oidc.user
    }
}
export default connect(mapStateToProps)(CallbackContainer);