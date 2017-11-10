import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { invokeApig, s3Upload } from '../libs/awslib'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import config from '../config.js'
import './Notes.css'

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: null,
      isDeleting: null,
      room: null,
      roomId: '',
      beds: '',
      costPerNight: '',
      maxOccupancy: ''
    }
  }

  async componentDidMount() {
    try {
      const results = await this.getRoom()
      this.setState({
        room: results,
        roomId: results.roomId,
        beds: results.beds,
        costPerNight: results.costPerNight,
        maxOccupancy: results.maxOccupancy
      })
    } catch (e) {
      alert(e)
    }
  }

  getRoom() {
    return invokeApig(
      { path: `/rooms/${this.props.match.params.id}` },
      this.props.userToken
    )
  }

  validateForm() {
    return this.state.roomId.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  saveRoom(room) {
    return invokeApig(
      {
        path: `/rooms/${this.props.match.params.id}`,
        method: 'PUT',
        body: room
      },
      this.props.userToken
    )
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })
    try {
      await this.saveRoom({
        ...this.state.room,
        roomId: this.state.roomId,
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

  deleteRoom() {
    return invokeApig(
      {
        path: `/rooms/${this.props.match.params.id}`,
        method: 'DELETE'
      },
      this.props.userToken
    )
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
      await this.deleteRoom()
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isDeleting: false })
    }
  }

  render() {
    return (
      <div className="Notes">
        {this.state.room &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <ControlLabel>Room Number</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.roomId}
                componentClass="input"
              />
            </FormGroup>
            {this.state.beds &&
              <FormGroup controlId="beds">
                <ControlLabel>Number of beds</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.beds}
                  componentClass="input"
                />
              </FormGroup>}

            {this.state.costPerNight &&
              <FormGroup controlId="beds">
                <ControlLabel>Cost Per Night</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.costPerNight}
                  componentClass="input"
                />
              </FormGroup>}

            {this.state.maxOccupancy &&
              <FormGroup controlId="beds">
                <ControlLabel>Max Occupancy</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.maxOccupancy}
                  componentClass="input"
                />
              </FormGroup>}

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
          </form>}
      </div>
    )
  }
}

export default withRouter(Notes)
