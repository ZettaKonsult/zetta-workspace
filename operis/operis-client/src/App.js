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
      error: undefined,
    };
  }
  updateRecipients = newRecipient => {
    this.setState(updateRecipientState(newRecipient));
  };

  initializeApp = async () => {
    try {
      let userInfo = await Auth.currentUserInfo();
      let companyCustomerId = userInfo.attributes['custom:companyCustomerId'];
      let recipients = await fetchRecipientAPI(companyCustomerId);

      this.setState({
        recipients,
        companyCustomerId,
      });
    } catch (error) {
      this.setState(state => ({ ...state, error: error.message }));
    }
  };

  async componentDidMount() {
    try {
      await this.initializeApp();
    } catch (error) {
      console.error(error);
    }
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
    // if (this.state.error) {
    //   return (
    //     <div>
    //       {this.state.error} <button onClick={this.initializeApp}>Retry</button>
    //     </div>
    //   );
    // }
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
