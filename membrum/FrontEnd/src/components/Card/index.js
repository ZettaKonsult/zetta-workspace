import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';

import './style.css';

const Card = props => (
  <div className="Card">
    <div
      style={{ '--theme-color': `var(--${props.type})` }}
      className="CardContent"
    >
      <i className={'CardIcon fa fa-5x fa-' + props.icon} />
      <div className="CardText">
        <div className="CardValue">{props.value}</div>
        <div>{props.label}</div>
      </div>
    </div>
    <Footer type={props.type} link={props.link} />
  </div>
);

Card.defaultProps = {
  type: 'primary',
  label: 'New Comments',
  icon: 'comments',
  value: '24',
};

Card.propTypes = {
  type: PropTypes.oneOf(['primary', 'warning', 'danger', 'info', 'success']),
  label: PropTypes.string,
  icon: PropTypes.oneOf(['comments', 'tasks', 'shopping-cart', 'support']),
  value: PropTypes.string,
};

export default Card;
