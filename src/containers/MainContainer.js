import React from 'react';
import { connect } from 'react-redux';
import loggedIn from '../loggedIn';
import Main from '../components/Main';

function MainContainer({ user }) {
    return <Main user={user} />
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}
export default loggedIn(connect(mapStateToProps)(MainContainer));