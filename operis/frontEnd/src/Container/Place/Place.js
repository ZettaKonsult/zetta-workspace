import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PlaceForm from '../../Places/Form/PlaceForm'
import './Place.css'

class Place extends Component {
  render() {
    return (
      <div>
        <PlaceForm id={this.props.match.params.id} />
        <Link to="/">Cancel</Link>
      </div>
    )
  }
}

export default Place
