import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const PageNav = ({ match, isAuthenticated }) => (
  <Menu widths="4" inverted fluid size="large">
    <NavLink to="/recipient">Recipient</NavLink>
    <NavLink to="/invoice">Invoice</NavLink>
    <NavLink to="/profile">Register</NavLink>
    {isAuthenticated ? (
      <NavLink to="/logout">logout</NavLink>
    ) : (
      <NavLink to="/login">login</NavLink>
    )}
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

export default connect(state => ({
  isAuthenticated: state.app.isAuthenticated,
}))(PageNav);
