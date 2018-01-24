import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Message = props => (
  <div className={`alert ${props.mode}`}>
    <span className="closebtn" onClick={props.onClick}>
      &times;
    </span>
    {props.children}
  </div>
);

Message.propTypes = {
  mode: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  onClick: PropTypes.func.isRequired,
};

Message.defaultProps = {
  mode: 'info',
};
export default Message;
