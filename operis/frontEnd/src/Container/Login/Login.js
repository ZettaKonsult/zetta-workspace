import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { UserPool } from 'zk-aws-users'

export default class Login extends Component {
  onSubmit = e => {
    e.preventDefault()
    console.log('hej')
  }

  setup() {
    console.log(UserPool)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </div>
    )
  }
}
