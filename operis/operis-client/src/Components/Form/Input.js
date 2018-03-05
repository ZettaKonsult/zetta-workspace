import React from 'react';

import { Form } from 'semantic-ui-react';

export const Input = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  ...rest
}) => (
  <div>
    <Form.Field error={!!touched && !!error}>
      <label>{placeholder}</label>
      <input {...input} {...rest} placeholder={placeholder} />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
);
