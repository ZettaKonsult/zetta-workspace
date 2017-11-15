import React from "react"
import PropTypes from "prop-types"
import "./style.css"

const Button = props => (
  <button
    className={props.large ? "btn btn-lg btn-primary" : "btn btn-primary"}
    type="button"
    disabled={props.disabled}
    onClick={props.onClick}
    style={{ "--button-theme": `var(--${props.type})` }}
  >
    {props.loading ? <i className="fa fa-spinner fa-spin" /> : props.children}
  </button>
)

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  large: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["primary", "warning", "danger", "info", "success"])
}

Button.defaultProps = {
  text: "Send Form",
  disabled: false,
  large: false,
  loading: false,
  type: "primary"
}
export default Button
