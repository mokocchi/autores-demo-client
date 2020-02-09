import React from "react";
import { connect } from "react-redux";
import { CallbackComponent, userSignedOut } from "redux-oidc";
import userManager from "./userManager";
import { TOKEN_AUTH_URL } from "./config";

class CallbackPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
    }

    async onSuccess() {
        const response = await fetch(TOKEN_AUTH_URL, {
            method: 'POST',
            headers: {
                "X-AUTH-TOKEN": true
            },
            body: JSON.stringify({
                "token": this.props.user.id_token
            })
        });
        const data = await response.json();
        if (data.errors) {
            this.props.dispatch(userSignedOut());
        } else {
            //store user on redux
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
                <div>Redirecting...</div>
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