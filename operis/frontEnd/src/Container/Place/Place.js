import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import PlaceForm from '../../Places/Form/PlaceForm'
import './Place.css'

class Place extends Component {
  callback = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <PlaceForm callback={this.callback} id={this.props.match.params.id} />
        <Link to="/">Cancel</Link>
      </div>
    )
  }
}

export default withRouter(Place)
