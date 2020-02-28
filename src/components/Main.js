import React from 'react';

function Main({ user }) {
    return <div>
        <div>
            Bienvenido, {user.nombre} {user.apellido}!
        </div>
    </div>
}

export default Main;