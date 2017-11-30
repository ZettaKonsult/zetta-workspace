import React from 'react'

import FormGroup from '../../Components/FormGroup/FormGroup'
import Input from '../../Components/Input/Input'

export const inputGroup = ({
  input,
  type,
  name,
  placeholder,
  value,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    name={input.name}
    placeholder={placeholder}
    error={error}
    touched={touched}>
    <Input {...input} type={type} autoComplete="off" />
  </FormGroup>
)
