import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import Routes from './App';
import config from './config';

import { createCompanyCustomer } from './CompanyCustomer/companyCustomerReducer';

import 'semantic-ui-css/semantic.min.css';

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
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
      {
        name: 'recipients',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
      {
        name: 'invoices',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const store = configureStore();

store.dispatch(createCompanyCustomer());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes currentUser={'cjkplk2120000lccvxv3d68fl'} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
