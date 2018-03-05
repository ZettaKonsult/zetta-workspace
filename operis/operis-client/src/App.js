import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Menu, Divider } from 'semantic-ui-react';

import Routes from './Routes';
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
        <Menu widths="5" inverted fluid size="large">
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/recipient">Recipient</NavLink>
          <NavLink to="/Invoice" activeOnlyWhenExact>
            Invoice
          </NavLink>
          <NavLink to="/admin" activeOnlyWhenExact>
            Admin
          </NavLink>
          <Menu.Item as="button" onClick={this.signOut}>
            Logout
          </Menu.Item>
        </Menu>
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes
            recipients={this.state.recipients}
            updateRecipients={this.updateRecipients}
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

const NavLink = ({ to, activeOnlyWhenExact, children }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Menu.Item as={Link} to={to} active={!!match}>
        {children}
      </Menu.Item>
    )}
  />
);

export default App;
