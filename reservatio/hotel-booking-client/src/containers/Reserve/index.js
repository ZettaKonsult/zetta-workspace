import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { invokeApig } from '../../libs/awslib'

import { Message } from '../../components/Message'
import Form from './Form'
import toggleDate, { isDatesConcurrent, removeDatesFromArray } from './actions'
import {
  getReservedDates,
  getReservedArray,
  getBookings,
  getReservation
} from './editMode'

import { update } from '../../libs/apiDatabase'

class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      isLoading: null,
      room: null,
      selectedDates: [],
      reservation: {
        name: '',
        phone: '',
        email: '',
        paid: false
      }
    }
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })

      const room = await this.getReservation()

      let reservedDates = getReservedDates(room.reserved)
      let selectedDates = this.state.selectedDates
      let reservation = this.state.reservation

      const roomToEdit = this.roomToEdit()
      if (roomToEdit !== null && !isNaN(roomToEdit)) {
        reservation = getReservation(room.reserved, roomToEdit)
        selectedDates = reservation.dates
        reservedDates = removeDatesFromArray(reservedDates, selectedDates)
      }

      this.setState({
        room,
        reservedDates,
        selectedDates,
        reservation,
        isLoading: false
      })
    } catch (e) {
      alert(e)
    }
  }

  roomToEdit = () => Number(this.props.match.params.startTime)

  getReservation() {
    const encodedId = encodeURIComponent(this.props.match.params.id)
    return invokeApig({ path: `/rooms/${encodedId}` }, this.props.userToken)
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { selectedDates, room, reservation } = this.state
    const { email, name, phone, paid } = reservation
    this.setState({ isLoading: true })

    if (selectedDates.length === 0) {
      this.setState({ error: 'No dates are selected.', isLoading: false })
      return
    }

    if (!isDatesConcurrent(selectedDates)) {
      this.setState({
        error: 'Can only save concurrent dates.',
        isLoading: false
      })
      return
    }

    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      this.setState({ error: 'Please fill in all fields.', isLoading: false })
      return
    }
    const reserved = [
      ...room.reserved,
      {
        name: name,
        email: email,
        phone: phone,
        dates: [...selectedDates],
        paid: paid
      }
    ]
    try {
      // await this.saveReservation({
      //   ...room
      // })
      await update(
        'rooms',
        this.props.match.params.id,
        { reserved },
        this.props.userToken
      )
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  handleChange = event => {
    this.setState({ error: '' })
    this.setState({ [event.target.id]: event.target.value })
  }

  handleDate = e => {
    this.setState({ error: '' })
    this.setState({
      selectedDates: toggleDate(e.target.id, this.state.selectedDates)
    })
  }

  handleFormChange = event => {
    this.setState({ error: '' })
    this.setState({
      reservation: {
        ...this.state.reservation,
        [event.target.id]: event.target.value
      }
    })
  }

  getValues = () => ({
    email: this.state.reservation.email,
    name: this.state.reservation.name,
    paid: this.state.reservation.paid,
    phone: this.state.reservation.phone
  })

  render() {
    return (
      <div>
        {this.state.error && (
          <div style={{ marginBottom: '1em' }}>
            <Message>{this.state.error}</Message>
          </div>
        )}
        {this.state.room && (
          <Form
            handleDate={this.handleDate}
            handleChange={this.handleChange}
            handleFormChange={this.handleFormChange}
            handleSubmit={this.handleSubmit}
            selectedDates={this.state.selectedDates}
            reservedDates={this.state.reservedDates}
            value={this.getValues()}
            isLoading={this.state.isLoading}
            date={this.roomToEdit() ? new Date(this.roomToEdit()) : new Date()}
          />
        )}
      </div>
    )
  }
}

export default withRouter(Reserve)
