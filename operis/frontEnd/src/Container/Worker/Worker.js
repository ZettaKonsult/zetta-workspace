import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import {Button, Icon} from 'semantic-ui-react'

import WorkerForm from '../../Workers/Form/WorkerForm'
import {deleteWorker} from '../../Workers/WorkerActions'
import {getVisibleWorkers} from '../../reducers'

class Worker extends Component {
  callback = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <WorkerForm callback={this.callback} id={this.props.match.params.id} />
        <Button as={Link} to="/">
          Cancel
        </Button>
        {this.props.workers.map(worker => (
          <WorkerCard
            key={worker.id}
            name={worker.name}
            onClick={() => this.props.deleteWorker(worker.id)}
          />
        ))}
      </div>
    )
  }
}

const WorkerCard = props => (
  <div>
    {props.name}
    <Icon onClick={props.onClick} link name="close" />
  </div>
)
const mapStateToProps = (state, props) => ({
  workers: getVisibleWorkers(state)
})

export default connect(mapStateToProps, {deleteWorker})(withRouter(Worker))
