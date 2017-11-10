import React, { Component } from 'react'

import LoginForm from './LoginForm'
import ResetPassword from './ResetPassword'

import Loader from '../../components/Loader'

import login from '../../libs/awsLogin'

import config from '../../config'

import './style.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.redirectPage = '/admindashboard'
    this.state = {
      error: null,
      ssn: '',
      password: '',
      resetPassword: false,
      loading: false
    }
  }

  validateForm = (ssn, password) => ssn.length > 0 && password.length > 0

  resetPassword = () =>
    this.setState({ resetPassword: !this.state.resetPassword })

  closeMessage = () => this.setState({ error: null })
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { ssn, password } = this.state
    if (!this.validateForm(ssn, password)) {
      this.setState({ error: 'fill in the form' })
      return
    }
    try {
      this.setState({ loading: true })
      await login(ssn, password, config.cognito)
      this.props.userHasAuthenticated(true)
      this.props.history.push(this.redirectPage)
    } catch (e) {
      this.setState({ error: e.message, loading: false })
    }
  }

  render = () =>
    this.state.loading ? (
      <Loader />
    ) : this.state.resetPassword ? (
      <ResetPassword resetPassword={this.resetPassword} />
    ) : (
      <LoginForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        error={this.state.error}
        closeMessage={this.closeMessage}
        ssn={this.state.ssn}
        password={this.state.password}
        resetPassword={this.resetPassword}
      />
    )
}
