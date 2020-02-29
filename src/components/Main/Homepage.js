import React from 'react';

function Homepage({ user }) {
    return <div>
        <div>
            Bienvenido, {user.nombre} {user.apellido}!
        </div>
    </div>
}

export default Homepage;