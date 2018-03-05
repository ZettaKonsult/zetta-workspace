import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const PageNav = ({ match, onSignOut }) => (
  <Menu widths="4" inverted fluid size="large">
    <NavLink to="/report">Report</NavLink>
    <NavLink to="/recipient">Recipient</NavLink>
    <NavLink to="/invoice">Invoice</NavLink>
    <Menu.Item as="button" onClick={onSignOut}>
      Logout
    </Menu.Item>
  </Menu>
);

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

export default PageNav;
