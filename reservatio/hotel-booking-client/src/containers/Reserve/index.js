import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Calendar from '../../components/Calendar/'
import { invokeApig } from '../../libs/awslib'
import LoaderButton from '../../components/LoaderButton'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import toggleDate, { bookingMode } from './actions'
import { editMode } from './editMode'

class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: null,
      room: null,
      selectedDates: [],
      reservedDates: [],
      email: '',
      name: '',
      phone: '',
      paid: false
    }
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })
      const results = await this.getReservation()
      const mode =
        this.getEdit !== null
          ? editMode(results, this.getEdit())
          : bookingMode(results)

      const reservedDates = mode.getReservedDates()
      const reservation = mode.getReservation()

      this.setState({
        room: results,
        reservedDates,
        ...reservation,
        isLoading: false
      })
    } catch (e) {
      alert(e)
    }
  }

  getEdit = () => Number(this.props.match.params.startTime)

  getReservation() {
    return invokeApig(
      { path: `/rooms/${this.props.match.params.id}` },
      this.props.userToken
    )
  }

  async saveReservation(reservation) {
    return invokeApig(
      {
        path: `/rooms/${this.props.match.params.id}`,
        method: 'PUT',
        body: reservation
      },
      this.props.userToken
    )
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true })

    const mode =
      this.getEdit !== null
        ? editMode(this.state.room, this.getEdit())
        : bookingMode(this.state.room)

    const newReservation = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      dates: [...this.state.selectedDates],
      paid: this.state.paid
    }
    const reserved = [...mode.getBookings(), newReservation]

    try {
      await this.saveReservation({
        ...this.state.room,
        reserved
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleDate(e) {
    this.setState({
      selectedDates: toggleDate(e.target.id, this.state.selectedDates)
    })
  }

  render() {
    return (
      <div>
        {this.state.room &&
          <Calendar
            header
            weekdays
            selectedDates={this.state.selectedDates}
            reservedDates={this.state.reservedDates}
            select={e => this.handleDate(e)}
            date={this.getEdit() ? new Date(this.getEdit()) : new Date()}
          />}
        <InputField
          type="text"
          id="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <InputField
          type="text"
          id="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <InputField
          type="text"
          id="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChange}
        />
        <SelectField
          id="paid"
          value={this.state.paid}
          onChange={this.handleChange}
        >
          <option value="false">Unpaid</option>
          <option value="true">Paid</option>
        </SelectField>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          type="submit"
          onClick={e => this.handleSubmit(e)}
          isLoading={this.state.isLoading}
          text="Save"
          loadingText="Loading…"
          style={{ margin: '1em' }}
        />
      </div>
    )
  }
}

export default withRouter(Reserve)
