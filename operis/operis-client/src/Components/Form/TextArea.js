import React from 'react';
import { Form, TextArea as Text } from 'semantic-ui-react';

export const TextArea = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  ...rest
}) => (
  <div>
    <Form.Field error={!!touched && !!error}>
      <label>{placeholder}</label>
      <Text autoHeight {...input} {...rest} placeholder={placeholder} />
      {!!touched &&
        !!error && <span style={{ color: '#ae5856' }}>{error}</span>}
    </Form.Field>
  </div>
);
