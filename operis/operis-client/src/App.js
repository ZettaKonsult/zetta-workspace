import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Menu, Divider } from 'semantic-ui-react';

import Routes from './Routes';

const companyCustomerId = 'cjdvmtzgd000104wgiubpx9ru';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipients: [],
    };
  }
  async componentDidMount() {
    const recipients = await API.get(
      'invoice',
      `/recipient/${companyCustomerId}`,
      {
        header: {},
      }
    );
    this.setState({ recipients });
  }
  async signOut() {
    await Auth.signOut();
  }

  render() {
    return (
      <div>
        <Menu widths="5" inverted fluid size="large">
          <NavLink to="/report" activeOnlyWhenExact>
            Report
          </NavLink>
          <NavLink to="/place" activeOnlyWhenExact>
            Recipient
          </NavLink>
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
          <Routes recipients={this.state.recipients} />
        </div>
      </div>
    );
  }
}

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

export default withRouter(connect(undefined)(App));
