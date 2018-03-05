import React, { Component } from 'react';

import { Auth } from 'aws-amplify';
import { Divider } from 'semantic-ui-react';

import Routes from './Routes';
import PageNav from './Components/Nav/PageNav';
import { fetchRecipientAPI } from './Places/recipientApi';
import { updateObjectArrayState } from './util/stateUtils';

const companyCustomerId = 'cjdvmtzgd000104wgiubpx9ru';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipients: [],
    };
  }
  updateRecipients = newRecipient => {
    this.setState(updateRecipientState(newRecipient));
  };

  async componentDidMount() {
    const recipients = await fetchRecipientAPI(companyCustomerId);
    this.setState({ recipients });
  }
  async signOut() {
    await Auth.signOut();
  }

  render() {
    return (
      <div>
        <PageNav />
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes
            recipients={this.state.recipients}
            updateRecipients={this.updateRecipients}
            companyCustomerId={companyCustomerId}
          />
        </div>
      </div>
    );
  }
}

const updateRecipientState = newRecipient => state => {
  const { recipients } = state;
  const newState = {
    ...state,
    recipients: updateObjectArrayState(newRecipient, recipients),
  };
  return newState;
};

export default App;
