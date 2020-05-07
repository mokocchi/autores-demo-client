import React, { Component } from 'react';
import { connect } from 'react-redux';

import userManager from '../../userManager';
import tokenManager from '../../tokenManager';
import history from '../../history'
import { apiUserLoggedOut } from '../../redux/actions';
import Menu from './Menu';


class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.onClickCerrarSesion = this.onClickCerrarSesion.bind(this);
    }

    onClickCerrarSesion(event) {
        event.preventDefault();
        userManager.removeUser();
        tokenManager.removeApiUser();
        this.props.dispatch(apiUserLoggedOut());
        history.push("/");
    }

    onClickIniciarSesion(event) {
        event.preventDefault();
        userManager.signinRedirect();
    }

    render() {
        return (
            <Menu token={this.props.token} user={this.props.user} onClickCerrarSesion={this.onClickCerrarSesion} onClickIniciarSesion={this.onClickIniciarSesion} />
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.oidc.user,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(MenuContainer);