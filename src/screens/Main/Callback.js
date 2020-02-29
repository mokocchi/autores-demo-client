import React from 'react';
import CallbackContainer from '../../components/Main/CallbackContainer';

const Callback = ({ match: { params }, history }) => {
    return <CallbackContainer history={history}/>
}

export default Callback;