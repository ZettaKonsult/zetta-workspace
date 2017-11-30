import React from 'react'

import FormGroup from '../../Components/FormGroup/FormGroup'
import Input from '../../Components/Input/Input'
import Textarea from '../../Components/Textarea/Textarea'
import Select from '../../Components/Select/Select'

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

export const textGroup = ({
  input,
  type,
  name,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    name={input.name}
    placeholder={placeholder}
    error={error}
    touched={touched}>
    <Textarea {...input} />
  </FormGroup>
)

export const selectGroup = ({
  input,
  type,
  name,
  placeholder,
  children,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    name={input.name}
    placeholder={placeholder}
    error={error}
    touched={touched}>
    <Select {...input}>{children}</Select>
  </FormGroup>
)
