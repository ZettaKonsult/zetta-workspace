import React from 'react'

const SignupForm = ({ handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>SSN</label>
    <input id="ssn" autoFocus type="text" onChange={handleChange} />

    <label>Email</label>
    <input id="email" autoFocus type="text" onChange={handleChange} />

    <label>Password</label>
    <input id="password" onChange={handleChange} type="password" />

    <label>Confirm Password</label>
    <input id="confirmPassword" onChange={handleChange} type="password" />

    <button type="submit">Signup</button>
  </form>
)

export default SignupForm
