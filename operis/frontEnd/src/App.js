import React, { Component } from 'react';

import Routes from './Routes';

import { Menu, Divider } from 'semantic-ui-react';

import { Link, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Menu widths="4" inverted fluid size="large">
          <NavLink to="/worker" activeOnlyWhenExact>
            Worker
          </NavLink>
          <NavLink to="/report" activeOnlyWhenExact>
            Report
          </NavLink>
          <NavLink to="/place" activeOnlyWhenExact>
            Workplace
          </NavLink>
          <NavLink to="/admin" activeOnlyWhenExact>
            Admin
          </NavLink>
        </Menu>
        <Divider />
        <Routes />
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
