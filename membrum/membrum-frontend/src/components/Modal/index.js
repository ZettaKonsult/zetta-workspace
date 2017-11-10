import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class Modal extends Compoent (
  <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={props.onClick}>
        &times;
      </span>
      {props.children}
    </div>
  </div>
)

Modal.propTypes = {
  onClick: PropTypes.func.isRequired
}
