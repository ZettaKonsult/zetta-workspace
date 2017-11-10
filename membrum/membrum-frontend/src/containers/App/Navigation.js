import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from './NavLink'

import './Navigation.css'

export default class TopNavigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggled: false
    }
  }

  toggleNav = () => this.setState({ toggled: !this.state.toggled })

  render() {
    const className = this.state.toggled
      ? 'TopNavigation responsive'
      : 'TopNavigation'

    const authLink = this.props.authenticated ? (
      <Logout logout={this.props.logout} />
    ) : (
      <Login />
    )

    const links = this.props.authenticated ? userLinks : guestLinks

    return (
      <div className={className}>
        {links.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            label={item.label}
            activeOnlyWhenExact
          />
        ))}

        {authLink}
        <Hamburger toggle={this.toggleNav} />
      </div>
    )
  }
}

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired
}

const Logout = ({ logout }) => (
  <a className="Authentication" onClick={logout}>
    Logout
  </a>
)
const Login = () => (
  <NavLink className="Authentication" to="/login" label="Login" />
)

const Hamburger = ({ toggle }) => (
  <a className="icon" onClick={toggle}>
    &#9776;
  </a>
)

const guestLinks = [
  { to: '/', label: 'Home' },
  { to: '/sh', label: 'Help Me!!!' }
]

const userLinks = [
  { to: '/mypage/contact', label: 'My Page' },
  { to: '/statistics', label: 'Statistics' },
  { to: '/admindashboard', label: 'Dashboard' }
]
