import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './Notes.css'

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: null,
      isDeleting: null,
      roomId: '',
      beds: '',
      costPerNight: '',
      maxOccupancy: ''
    }
  }

  async componentDidMount() {
    try {
      const results = await this.props.database.getRoom(
        this.props.match.params.id
      )
      this.setState({
        roomId: results.roomId,
        beds: results.beds,
        costPerNight: results.costPerNight,
        maxOccupancy: results.maxOccupancy
      })
    } catch (e) {
      alert(e)
    }
  }

  validateForm() {
    return this.state.roomId.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })
    try {
      await this.props.database.updateRoom(this.props.match.params.id, {
        beds: this.state.beds,
        costPerNight: this.state.costPerNight,
        maxOccupancy: this.state.maxOccupancy
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  handleDelete = async event => {
    event.preventDefault()

    const confirmed = window.confirm(
      'Are you sure you want to delete this room?'
    )

    if (!confirmed) {
      return
    }

    this.setState({ isDeleting: true })

    try {
      await this.props.database.removeRoom({
        Key: { roomId: this.props.match.params.id }
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isDeleting: false })
    }
  }

  render() {
    return (
      <div className="Notes">
        {this.state.roomId && (
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="roomId">
              <ControlLabel>Room Number</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.roomId}
                componentClass="input"
                disabled
              />
            </FormGroup>
            <FormGroup controlId="beds">
              <ControlLabel>Number of beds</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.beds}
                componentClass="input"
              />
            </FormGroup>

            <FormGroup controlId="costPerNight">
              <ControlLabel>Cost Per Night</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.costPerNight}
                componentClass="input"
              />
            </FormGroup>

            <FormGroup controlId="maxOccupancy">
              <ControlLabel>Max Occupancy</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.maxOccupancy}
                componentClass="input"
              />
            </FormGroup>

            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>
        )}
      </div>
    )
  }
}

export default withRouter(Notes)
