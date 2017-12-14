import React from 'react'

import { Form, Message } from 'semantic-ui-react'

export const inputGroup = ({
  input,
  type,
  name,
  placeholder,
  value,
  meta: { touched, error, warning }
}) => (
  <div>
    <Form.Input
      {...input}
      label={placeholder}
      type={type}
      placeholder={placeholder}
      error={!!touched && !!error}
    />
    {!!touched && !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
  </div>
)
