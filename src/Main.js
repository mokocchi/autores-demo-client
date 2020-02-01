import React from 'react';
import { connect } from 'react-redux';

function Main({user}) {
    return <div>
        <div>
            Bienvenido, {user.profile.name}!
        </div>
    </div>
}

function mapStateToProps(state) {
    return {
        user: state.oidc.user
    }
}
export default connect(mapStateToProps)(Main);