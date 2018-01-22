import React from 'react'
import Input from './Input/Input'

const FormInput = ({
  input,
  label,
  type,
  meta: { touched, error },
  disabled
}) => (
  <div>
    <label>{label}</label>
    <div>
      <Input {...input} type={type} placeholder={label} disabled={disabled} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export default FormInput
