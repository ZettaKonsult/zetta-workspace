import React from 'react';

import { Form } from 'semantic-ui-react';

export const Input = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  ...rest
}) => (
  <Form.Input
    {...input}
    {...rest}
    error={error}
    label={placeholder}
    placeholder={placeholder}
  />
);
