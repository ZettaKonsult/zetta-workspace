import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import PlaceForm from './Form/PlaceForm'
import {Button} from 'semantic-ui-react'

class Place extends Component {
  callback = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <PlaceForm callback={this.callback} id={this.props.match.params.id} />
        <Button as={Link} to="/">
          Cancel
        </Button>
      </div>
    )
  }
}

export default withRouter(Place)
