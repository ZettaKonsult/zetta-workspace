import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchAllPlans } from '../../membership/membershipActions'
import { loadUserProfile } from '../../user/authenticationActions'

import Navigation from './Navigation'
import Footer from '../../components/Footer'

import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchAllPlans()
    this.props.loadUserProfile()
  }

  render() {
    return (
      <div className="App">
        <Navigation
          logout={() => {}}
          authenticated={this.props.isAuthenticated}
        />
        <div className="AppContent">{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = {
  loadUserProfile,
  fetchAllPlans
}

export default withRouter(connect(undefined, mapDispatchToProps)(App))
