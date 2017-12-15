import React from 'react'
import { Form, TextArea as Text } from 'semantic-ui-react'

export const TextArea = ({
  input,
  type,
  name,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <Form.Field error={!!touched && !!error}>
      <label>{placeholder}</label>
      <Text autoHeight {...input} placeholder={placeholder} />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
)
