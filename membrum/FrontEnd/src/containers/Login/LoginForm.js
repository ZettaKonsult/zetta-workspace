import React from 'react'
import {Field, reduxForm} from 'redux-form'

//TODO move onChange, closeMessage, ssn and password to this and make class
//TODO add &#x1f441; to password and have onclick for toggling visility
let LoginForm = props => {
  const {handleSubmit} = props
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

export default reduxForm({form: 'LoginForm'})(LoginForm)
