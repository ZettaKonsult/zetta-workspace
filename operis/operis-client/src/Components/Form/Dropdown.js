import React from 'react';
import { Form, Dropdown as Select } from 'semantic-ui-react';

export const Dropdown = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  ...rest
}) => (
  <div>
    <Form.Field error={!!touched && !!error}>
      <label>{placeholder}</label>
      <Select
        {...input}
        {...rest}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={placeholder}
        fluid
        search
        selection
      />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
);
