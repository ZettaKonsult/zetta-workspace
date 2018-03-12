import React, { Component } from 'react';

import { Auth } from 'aws-amplify';
import { Divider } from 'semantic-ui-react';

import Routes from './Routes';
import PageNav from './Components/Nav/PageNav';
import { fetchRecipientAPI } from './Places/recipientApi';
import { updateObjectArrayState } from './util/stateUtils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipients: [],
      companyCustomerId: '',
    };
  }
  updateRecipients = newRecipient => {
    this.setState(updateRecipientState(newRecipient));
  };

  async componentDidMount() {
    let userInfo, recipients, companyCustomerId;
    try {
      userInfo = await Auth.currentUserInfo();
      companyCustomerId = userInfo.attributes['custom:companyCustomerId'];
      recipients = await fetchRecipientAPI(companyCustomerId);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      recipients,
      companyCustomerId,
    });
  }
  signOut = async () => {
    try {
      await Auth.signOut();
      this.setState({ companyCustomerId: '' });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <PageNav onSignOut={this.signOut} />
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes
            recipients={this.state.recipients}
            updateRecipients={this.updateRecipients}
            companyCustomerId={this.state.companyCustomerId}
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
