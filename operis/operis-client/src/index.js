import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';

import 'semantic-ui-css/semantic.min.css';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import Routes from './App';
import config from './config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'companycustomer',
        endpoint: `${config.apiGateway.URL}/companycustomer`,
        region: config.apiGateway.REGION,
      },
      {
        name: 'recipients',
        endpoint: `${config.apiGateway.URL}/recipient`,
        region: config.apiGateway.REGION,
      },
      {
        name: 'invoices',
        endpoint: `${config.apiGateway.URL}/invoice`,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
