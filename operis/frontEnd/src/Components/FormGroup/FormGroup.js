import React from 'react'
import styled from 'styled-components'

const FormGroup = ({ name, placeholder, error, touched, children }) => (
  <div>
    <label htmlFor={name}>{placeholder}</label>
    <div>
      {children}
      {error && touched && <Error>{error}</Error>}
    </div>
  </div>
)

const Error = styled.span`
  color: red;
`

export default FormGroup
