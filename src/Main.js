import React from 'react';
import { connect } from 'react-redux';
import loggedIn from './loggedIn';

function Main({user}) {
    return <div>
        <div>
            Bienvenido, {user.nombre} {user.apellido}!
        </div>
    </div>
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}
export default loggedIn(connect(mapStateToProps)(Main));