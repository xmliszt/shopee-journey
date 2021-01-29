import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-hot-loader';

import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ENVIRONMENT } from 'env';

import { store } from 'data/store';
import history from 'data/history';

import App from './components/App';

// Initialize Web Bridge
window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.init();

if (ENVIRONMENT === 'DEV') {
  const VConsole = require('vconsole/dist/vconsole.min');
  new VConsole();
}

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
