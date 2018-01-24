import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FormInput from '../components/FormInput'

import { loginUser } from './authenticationActions'

//TODO add &#x1f441; to password and have onclick for toggling visility
let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={FormInput}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={FormInput}
        label="Password"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
LoginForm = reduxForm({ form: 'LoginForm' })(LoginForm)

export default connect(undefined, {
  onSubmit: values => loginUser(values.username, values.password)
})(LoginForm)
