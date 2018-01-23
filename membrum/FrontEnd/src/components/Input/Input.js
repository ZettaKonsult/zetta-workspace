import React from 'react'
import PropTypes from 'prop-types'
import InputStyle from './InputStyle'
const Input = ({ name, value, onChange, id, type, label }) => (
  <InputStyle
    type={type}
    name={name}
    placeholder={name}
    value={value}
    onChange={onChange}
  />
)

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}

Input.defaultProps = {
  name: 'default',
  type: 'text'
}

export default Input
