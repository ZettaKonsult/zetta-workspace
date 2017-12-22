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
    this.props.history.push('/worker')
  }

  newWorker = () => {
    this.props.history.push('/worker/0')
  }

  renderList = props =>
    props.workers.map(worker => (
      <WorkerCard
        key={worker.id}
        name={worker.name}
        onClick={() => this.props.deleteWorker(worker.id)}
      />
    ))

  render() {
    const {id} = this.props.match.params
    return (
      <div>
        {!!id ? (
          <div>
            <WorkerForm callback={this.callback} id={id} />
            <Button onClick={this.callback} content="Cancel" />
          </div>
        ) : (
          <div>
            <Button
              fluid
              primary
              onClick={this.newWorker}
              content="New Worker"
            />
            {this.renderList(this.props)}
          </div>
        )}
      </div>
    )
  }
}

const WorkerCard = props => (
  <div
    style={{
      padding: '0.5em',
      border: '1px solid grey',
      margin: '0.2em',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: '5px'
    }}
  >
    <bold style={{fontSize: '1.2em'}}>{props.name}</bold>
    <Icon onClick={props.onClick} link name="close" />
  </div>
)
const mapStateToProps = (state, props) => ({
  workers: getVisibleWorkers(state)
})

export default connect(mapStateToProps, {deleteWorker})(withRouter(Worker))
