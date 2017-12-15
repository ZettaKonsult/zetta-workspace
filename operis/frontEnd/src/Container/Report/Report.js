import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import ReportForm from '../../Reports/Form/ReportForm'
import { Button } from 'semantic-ui-react'

class Report extends Component {
  callback = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <ReportForm callback={this.callback} id={this.props.match.params.id} />
        <Button as={Link} to="/">
          Cancel
        </Button>
      </div>
    )
  }
}

export default withRouter(Report)
