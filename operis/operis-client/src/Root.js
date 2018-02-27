import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import App from './App';
// window.LOG_LEVEL = 'DEBUG';
Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-central-1:7d192852-cdfb-4e5c-9a26-6939efae03ff',
    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_BUqf4Wvtb',
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: '1c7edgt3u3du016vtr689kha93',
  },
  API: {
    endpoints: [
      {
        name: 'invoice',
        endpoint:
          'https://5sefyvqrp4.execute-api.eu-central-1.amazonaws.com/dev',
        region: 'eu-central-1',
      },
    ],
  },
});

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default withAuthenticator(Root);
