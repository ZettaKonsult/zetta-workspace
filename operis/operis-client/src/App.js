import React, { Component } from 'react';

import { Auth } from 'aws-amplify';
import { Divider } from 'semantic-ui-react';

import Routes from './Routes';
import PageNav from './Components/Nav/PageNav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      companyCustomerId: '123123',
      error: undefined,
    };
  }

  signOut = () => {};

  render() {
    return (
      <div>
        <PageNav onSignOut={this.signOut} />
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes
            updateRecipients={this.updateRecipients}
            companyCustomerId={this.state.companyCustomerId}
          />
        </div>
      </div>
    );
  }
}

export default App;
