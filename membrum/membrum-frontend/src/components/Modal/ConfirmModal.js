import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import './style.css'

const Modal = props => (
  <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={props.onClick}>
        &times;
      </span>
      {props.children}
      <div className="ButtonGroup">
        <Button type={'danger'} large onClick={props.accept}>
          Accept
        </Button>
        <Button large onClick={props.canel}>
          Canel
        </Button>
      </div>
    </div>
  </div>
)

export default Modal

Modal.propTypes = {
  onClick: PropTypes.func.isRequired
}
