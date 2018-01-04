import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { loginUser } from './authenticationActions'

//TODO move onChange, closeMessage, ssn and password to this and make class
//TODO add &#x1f441; to password and have onclick for toggling visility
let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <Field name="username" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

LoginForm = reduxForm({ form: 'LoginForm' })(LoginForm)

export default connect(undefined, {
  onSubmit: values => loginUser(values.username, values.password)
})(LoginForm)
