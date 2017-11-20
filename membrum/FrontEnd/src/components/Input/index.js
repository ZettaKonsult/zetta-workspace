import React from "react"
import PropTypes from "prop-types"
import "./style.css"

const Input = ({ name, value, onChange, id, type, label }) => (
  <div className="InputField">
    <label htmlFor={name}>{label ? label : name}:</label>
    <input
      type={type}
      id={id ? id : name}
      name={name}
      placeholder={name}
      value={value}
      onChange={onChange}
    />
  </div>
)

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}

Input.defaultProps = {
  name: "default",
  type: "text"
}

export default Input
