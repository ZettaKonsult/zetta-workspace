import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import { fetchAllPlans } from '../membership/planActions'

import { logout } from '../user/authenticationActions'
import { loadUserProfile } from '../user/profileActions'
import { isUserAuthenticated } from '../user/'

import User from '../user/User'
import LoginForm from '../user/LoginForm'
import NotFound from './NotFound'
import Home from '../containers/Home/'
import Plan from '../membership/Plan'
import Admin from '../admin/Admin'

import Navigation from './Navigation'
import Footer from './Footer'

import './App.css'

const Layout = props => {
  return (
    <div className="App">
      <Navigation
        logout={() => props.logout()}
        authenticated={props.isAuthenticated}
      />
      <div className="AppContent">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginForm} />
          <AuthorizedRoute path="/plan" component={Plan} />
          <AuthorizedRoute path="/user" component={User} />
          <AuthorizedRoute path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

let AuthorizedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const stateToProps = state => ({
  isAuthenticated: isUserAuthenticated(state.userReducer)
})

AuthorizedRoute = connect(stateToProps)(AuthorizedRoute)

const mapStateToProps = state => ({
  isAuthenticated: isUserAuthenticated(state.userReducer)
})

const mapDispatchToProps = {
  loadUserProfile,
  fetchAllPlans,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
