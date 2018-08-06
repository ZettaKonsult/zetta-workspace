import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import App from './App';
// window.LOG_LEVEL = 'DEBUG';
Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'invoice',
        // endpoint:
        //   'https://5sefyvqrp4.execute-api.eu-central-1.amazonaws.com/dev',
        endpoint: 'http://localhost:8080',
        region: 'eu-central-1',
      },
    ],
  },
});

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
);

export default Root;
