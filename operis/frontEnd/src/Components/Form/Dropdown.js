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
        onChange={(param, data) => input.onChange(data.value)}
        name={name}
        placeholder={placeholder}
        options={options}
        fluid
        search
        selection
      />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
)
