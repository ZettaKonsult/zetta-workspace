import React from "react"
import PropTypes from "prop-types"

import "./style.css"

const Select = ({ onChange, name, value, option }) => (
  <div className="SelectField">
    {name && <label htmlFor={name}>{name}</label>}
    <select id={name} name={name} onChange={onChange} value={value}>
      {option.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
)

Select.propTypes = {
  onChange: PropTypes.func,
  option: PropTypes.array,
  value: PropTypes.string,
  name: PropTypes.string
}

export default Select
