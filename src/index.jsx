import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { registerServiceWorker } from "./register-sw";
import { store } from './_helpers';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
registerServiceWorker();
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);