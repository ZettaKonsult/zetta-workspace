import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = props => (
  <a
    className={props.large ? 'btn btn-lg btn-primary' : 'btn btn-primary'}
    type="button"
    disabled={props.disabled}
    href={props.src}
    download
  >
    Download {props.name}
  </a>
);

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  large: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  text: 'Send Form',
  disabled: false,
  large: false,
  loading: false,
};
export default Button;
