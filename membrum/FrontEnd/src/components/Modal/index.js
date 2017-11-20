import React, { Component } from "react"
import PropTypes from "prop-types"

import "./style.css"

Modal.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default class Modal extends Compoent {
  render() {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={props.onClick}>
            &times;
          </span>
          {props.children}
        </div>
      </div>
    )
  }
}
