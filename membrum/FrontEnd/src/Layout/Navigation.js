import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

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

    return (
      <div className={className}>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/member/membership" activeClassName="active">
          Membership
        </NavLink>
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/user/profile" activeClassName="active">
          Profile
        </NavLink>
        <NavLink to="/plan" activeClassName="active">
          plan
        </NavLink>

        <a className="Authentication" onClick={this.props.logout}>
          Logout
        </a>
        <a className="icon" onClick={this.toggleNav}>
          &#9776;
        </a>
      </div>
    )
  }
}

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired
}
