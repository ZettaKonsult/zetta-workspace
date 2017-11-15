import React from "react"

import Message from "../../components/Message"

import Input from "../../components/Input"
import Button from "../../components/Button"

//TODO move onChange, closeMessage, ssn and password to this and make class
//TODO add &#x1f441; to password and have onclick for toggling visility
const Login = ({
  onSubmit,
  onChange,
  error,
  closeMessage,
  ssn,
  password,
  resetPassword
}) => (
  <div className="Login">
    <div className="InputGroup">
      <Input
        autoFocus
        name="Social Security Number"
        id="ssn"
        type="text"
        value={ssn}
        onChange={onChange}
      />
      <Input
        value={password}
        name="password"
        onChange={onChange}
        type="password"
      />
    </div>

    <div className="ButtonGroup">
      <Button large type="primary" onClick={onSubmit}>
        Login
      </Button>
    </div>

    {error && (
      <Message mode="danger" onClick={closeMessage}>
        {error}
      </Message>
    )}

    <a onClick={resetPassword}>Forgot your password? Click here</a>
  </div>
)

export default Login
