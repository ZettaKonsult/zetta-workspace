import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const PageNav = ({ match, onSignOut }) => (
  <Menu widths="2" inverted fluid size="large">
    <NavLink to="/recipient">Recipient</NavLink>
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
