import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Calendar from '../../components/Calendar/'
import { invokeApig } from '../../libs/awslib'
import LoaderButton from '../../components/LoaderButton'
import InputField from '../../components/InputField'
import { Message } from '../../components/Message'
import SelectField from '../../components/SelectField'
import toggleDate, { bookingMode, isDatesConcurrent } from './actions'
import { editMode } from './editMode'

class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
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
    const {email, name, phone, selectedDates, paid, room} = this.state
    event.preventDefault()
    this.setState({ isLoading: true })

    if (selectedDates.length === 0) {
      this.setState({error: 'No dates are selected.', isLoading: false})
      return
    }

    if (!isDatesConcurrent(selectedDates)) {
      this.setState({error: 'Can only save concurrent dates.', isLoading: false})
      return
    }

    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      this.setState({error: 'Please fill in all fields.', isLoading: false})
      return
    }

    const mode =
      this.getEdit !== null
        ? editMode(room, this.getEdit())
        : bookingMode(room)

    const newReservation = {
      name: name,
      email: email,
      phone: phone,
      dates: [...selectedDates],
      paid: paid
    }
    const reserved = [...mode.getBookings(), newReservation]

    try {
      await this.saveReservation({
        ...room,
        reserved
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  handleChange = e => {
    this.setState({error: ''})
    this.setState({ [e.target.id]: e.target.value })
  }

  handleDate(e) {
    this.setState({error: ''})
    this.setState({
      selectedDates: toggleDate(e.target.id, this.state.selectedDates)
    })
  }

  render() {
    return (
      <div>
        {this.state.error &&
          <div style={{marginBottom:'1em'}}><Message>
            {this.state.error}
          </Message></div>
        }
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
