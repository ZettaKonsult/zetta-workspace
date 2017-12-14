import React, { Component } from 'react'

import Routes from './Routes'

import { Container, Menu } from 'semantic-ui-react'

import { Link, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Menu inverted size="large">
            <NavLink to="/" activeOnlyWhenExact>
              Home
            </NavLink>
            <NavLink to="/admin" activeOnlyWhenExact>
              Admin
            </NavLink>
          </Menu>
        </Container>
        <Container>
          <Routes />
        </Container>
      </div>
    )
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
)

export default App
