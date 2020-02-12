import React from 'react';
import loggedIn from './loggedIn';

export default loggedIn(() => {
    return <div><h2>No tenés permiso para ver esta página</h2></div>
})