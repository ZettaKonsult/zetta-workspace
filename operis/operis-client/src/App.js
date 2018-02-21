import React, { Component } from 'react';
import Routes from './Routes';
import { API, Auth } from 'aws-amplify';
import { Menu, Divider } from 'semantic-ui-react';

import { Link, Route } from 'react-router-dom';

class App extends Component {
  async componentDidMount() {
    try {
      console.log(await Auth.currentCredentials());
      await API.get('invoice', '/prod/billrow', {
        body: {
          companyCustomerId: 'cjdvmtzgd000104wgiubpx9ru',
          recipientId: 'cjdwtf0sm000604rnvc41tuu4',
          unit: 2,
          price: 500,
          description: 'här är en rad',
        },
      });
    } catch (err) {
      console.log(err);
    }
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
          <Routes />
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

export default App;
