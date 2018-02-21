import React from 'react';

import { Form } from 'semantic-ui-react';

export const Input = ({
  input,
  type,
  name,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div>
    <Form.Field error={!!touched && !!error}>
      <label>{placeholder}</label>
      <input {...input} type={type} placeholder={placeholder} />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
);
