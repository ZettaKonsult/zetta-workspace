import React from 'react'
import { Route, Link } from 'react-router-dom'

export const NavLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={match ? 'active' : ''} to={to}>
        {label}
        <span className="sr-only">{label}</span>
      </Link>
    )}
  />
)
