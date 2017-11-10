import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import config from '../config.js'
import './NewNote.css'
import { invokeApig, s3Upload } from '../libs/awslib'

class NewNote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: null,
      roomId: '',
      beds: 0,
      costPerNight: 0,
      maxOccupancy: 0
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
      await this.createNote({
        roomId: this.state.roomId,
        beds: this.state.beds,
        costPerNight: this.state.costPerNight,
        maxOccupancy: this.state.maxOccupancy,
        reserved: []
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  createNote(note) {
    return invokeApig(
      {
        path: '/rooms',
        method: 'POST',
        body: note
      },
      this.props.userToken
    )
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="roomId">
            <ControlLabel>Room Number</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.roomid}
              componentClass="input"
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

          <FormGroup controlId="maxOccupancy">
            <ControlLabel>Max occupancy</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.maxOccupancy}
              componentClass="input"
            />
          </FormGroup>

          <FormGroup controlId="costPerNight">
            <ControlLabel>cost Per Night</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.costPerNight}
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
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    )
  }
}

export default withRouter(NewNote)
