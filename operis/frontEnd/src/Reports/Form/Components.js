import React from 'react'
import styled from 'styled-components'

export const inputGroup = ({
  input,
  type,
  name,
  placeholder,
  value,
  meta: { touched, error, warning }
}) => (
  <div>
    <label htmlFor={input.name}>{placeholder}</label>
    <div>
      <Input {...input} type={type} autoComplete="off" />
      {error && touched && <span>{error}</span>}
    </div>
  </div>
)

export const textGroup = ({
  input,
  type,
  name,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label htmlFor={input.name}>{placeholder}</label>
    <div>
      <Textarea {...input} />
      {error && touched && <span>{error}</span>}
    </div>
  </div>
)

const Input = styled.input`
  padding: 0.5em;
  font-size: 1.3em;
  width: 90%;
`

const Textarea = styled.textarea`
  width: 95%;
  height: 10em;
  font-size: 1.2em;
`
