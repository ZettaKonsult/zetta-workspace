import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Navigation from './Navigation'
import Footer from '../../components/Footer'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Navigation
          logout={this.props.logout}
          authenticated={this.props.isAuthenticated}
        />
        <div className="AppContent">{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
