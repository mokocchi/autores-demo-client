import React from 'react';
import { connect } from 'react-redux';
import Homepage from './Homepage';

function HomepageContainer({ user }) {
    return <Homepage user={user} />
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(HomepageContainer);