import React, { Component } from 'react'
import {
  AuthenticationDetails,
  CognitoUserPool
} from 'amazon-cognito-identity-js'
import config from '../../config'
import SignupForm from './SignupForm'
import ConfirmationForm from './ConfirmationForm'
import * as is from './Validation'
import './style.css'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      ssn: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null
    }
  }

  validateForm = () =>
    is.email(this.state.email) &&
    is.password(this.state.password) &&
    is.confirmPassword(this.state.password, this.state.confirmPassword)

  validateConfirmationForm = () =>
    is.confirmationCode(this.state.confirmPassword)

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const newUser = await this.signup(
        this.state.ssn,
        this.state.email,
        this.state.password
      )
      this.setState({
        newUser: newUser
      })
    } catch (e) {
      alert(e)
    }

    this.setState({ isLoading: false })
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode)
      await this.authenticate(
        this.state.newUser,
        this.state.email,
        this.state.password
      )

      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  signup(ssn, email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })

    return new Promise((resolve, reject) =>
      userPool.signUp(
        ssn,
        password,
        [{ Name: 'email', Value: email }],
        null,
        (err, result) => {
          if (err) {
            reject(err)
            return
          }

          resolve(result.user)
        }
      )
    )
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    )
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null ? (
          <SignupForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <ConfirmationForm
            handleSubmit={this.handleConfirmationSubmit}
            handleChange={this.handleChange}
          />
        )}
      </div>
    )
  }
}
