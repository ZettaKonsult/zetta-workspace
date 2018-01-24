import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

class TopNavigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggled: false
    }
  }
  getToggled = () =>
    this.state.toggled ? 'TopNavigation responsive' : 'TopNavigation'

  toggleNav = () => this.setState({ toggled: !this.state.toggled })

  render() {
    const className = this.getToggled()
    const { authorizedRoutes } = this.props
    return (
      <div className={className}>
        {authorizedRoutes.map((route, i) => (
          <NavLink key={i} to={`${route.to}`} activeClassName="active">
            {route.label}
          </NavLink>
        ))}
        <Logout />
        <Toggle handleClick={this.toggleNav} />
      </div>
    )
  }
}

const Logout = () => <a className="Authentication">Logout</a>
const Toggle = ({ handleClick }) => (
  <a className="icon" onClick={handleClick}>
    &#9776;
  </a>
)

export default TopNavigation
