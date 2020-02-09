import React, { Component } from 'react';

import userManager from './userManager';

export default function silentRenew() {
    userManager.signinSilentCallback();
    return (<></>);
}