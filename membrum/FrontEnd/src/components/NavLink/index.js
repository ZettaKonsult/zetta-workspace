import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const NavLink = ({ label, to, activeOnlyWhenExact, className, onClick }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link
        className={`${className} ${match ? 'active' : ''}`}
        to={to}
        onClick={onClick}
      >
        {label}
        <span className="sr-only">{label}</span>
      </Link>
    )}
  />
);

NavLink.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool,
};

NavLink.defaultProps = {
  to: '/',
  label: 'Default Text',
  activeOnlyWhenExact: false,
};

export default NavLink;
