import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { loadUser } from "redux-oidc";
import { OidcProvider } from 'redux-oidc';
import reducer from './redux/index';
import './icons';

import userManager from "./userManager";
import App from './App';
import tokenManager from './tokenManager';

//@ts-ignore
if (process.env.NODE_ENV === "development") {
    require('whatwg-fetch'); //for polyfill cypress test 
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers()
)

loadUser(store, userManager);
tokenManager.initialize(store);
tokenManager.loadApiUser()

ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <App />
        </OidcProvider>
    </Provider>,
    document.getElementById('root')
);