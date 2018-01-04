import React, { Component } from 'react'

import Input from '../../components/Input'
import Button from '../../components/Button'
import FadedLine from '../../components/FadedLine'
import Message from '../../components/Message'

// import { forgotPassword } from "../../libs/awsPassword"
// import { isRequired } from "../../libs/Validation"

export default class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      error: []
    }
  }

  // forgotPassword = e => {
  //   e.preventDefault()
  //   if (isRequired(this.state.email)) {
  //     forgotPassword(this.state.email)
  //   } else {
  //     this.setState({ error: ["Fill in the field"] })
  //   }
  // }

  closeError = () => this.setState({ error: [] })

  onChange = e => this.setState({ [e.target.id]: e.target.value, error: [] })

  render() {
    return (
      <div>
        <h1 className="PageTitle">Reset Password</h1>
        <FadedLine />
        <div className="InputGroup">
          <Input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        {this.state.error.length > 0 && (
          <Message mode="danger" onClick={this.closeError}>
            {this.state.error[0]}
          </Message>
        )}
        <div className="ButtonGroup">
          <Button onClick={this.forgotPassword}>Forgot password</Button>
          <Button onClick={this.props.resetPassword}>Back to login</Button>
        </div>
      </div>
    )
  }
}
