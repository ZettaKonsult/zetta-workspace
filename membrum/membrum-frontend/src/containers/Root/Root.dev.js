import React, { Component } from "react"
import Routes from "./Routes"
import { withRouter } from "react-router-dom"

import { authUser, signOutUser } from "../../libs/awslib"

import App from "../App"

// import dbPlans from '../../mocks/Database'
// import dbSubscription from '../../mocks/Database'
// import { mockPlans } from '../../mocks/createMocks'

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    }
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true)
      }
    } catch (e) {
      alert(e)
    }

    this.setState({ isAuthenticating: false })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = event => {
    signOutUser()
    this.userHasAuthenticated(false)
    this.props.history.push("/login")
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      !this.state.isAuthenticating && (
        <App
          isAuthenticated={this.state.isAuthenticated}
          logout={this.handleLogout}
        >
          <h1>Dev</h1>
          <Routes childProps={childProps} />
        </App>
      )
    )
  }
}

export default withRouter(Root)
