import React from 'react'
import { Form, Dropdown as Select } from 'semantic-ui-react'

export const Dropdown = ({
  input,
  type,
  name,
  placeholder,
  children,
  options,
  meta: { touched, error, warning }
}) => (
  <div>
    <Form.Field error={!!touched && !!error}>
      <label>{placeholder}</label>
      <Select
        {...input}
        placeholder={placeholder}
        fluid
        search
        selection
        options={options}
      />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
)
