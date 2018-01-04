import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import PlaceForm from './Form/PlaceForm'
import {Button, Icon} from 'semantic-ui-react'

import {getPlaces} from '../reducers'

class Place extends Component {
  callback = () => {
    this.props.history.push('/place')
  }

  newWorkplace = () => {
    this.props.history.push('/place/0')
  }

  render() {
    const {id} = this.props.match.params
    return (
      <div>
        {!!id ? (
          <div>
            <PlaceForm
              callback={this.callback}
              id={this.props.match.params.id}
            />
            <Button onClick={this.callback}>Cancel</Button>
          </div>
        ) : (
          <div>
            <Button
              fluid
              primary
              onClick={this.newWorkplace}
              content="New Workplace"
            />
            {this.props.workplaces.map(item => (
              <WorkplaceCard
                key={item.id}
                name={item.name}
                onClick={() => {
                  this.props.history.push(`/place/${item.id}`)
                }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const WorkplaceCard = props => (
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
    onClick={props.onClick}
  >
    <strong style={{fontSize: '1.2em'}}>{props.name}</strong>
    <Icon onClick={props.delete} link name="close" />
  </div>
)

const mapStateToProps = (state, props) => ({
  workplaces: getPlaces(state)
})

export default connect(mapStateToProps)(withRouter(Place))
