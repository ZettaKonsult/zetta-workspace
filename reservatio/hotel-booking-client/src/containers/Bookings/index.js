import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { invokeApig } from '../../libs/awslib'

import Grid from './Grid'
import Today from './Today'
import Tomorrow from './Tomorrow'
import RestDays from './RestDays'
import Booking from './Booking'

import Compare from './Compare'

class Bookings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: null,
      rooms: null,
      reservations: null
    }
  }

  async componentWillMount() {
    try {
      const results = await this.getReservation()
      const reservations = this.createReservations(results)

      this.setState({
        reservations,
        rooms: results
      })
    } catch (e) {
      alert(e)
    }
  }

  getReservation(reservation) {
    return invokeApig({ path: `/rooms/` }, this.props.userToken)
  }

  createReservations(data) {
    const rooms = [...data]
    let reservations = []
    for (let i = 0; i < rooms.length; i++) {
      let reserved = [...rooms[i].reserved]
      for (let j = 0; j < reserved.length; j++) {
        const dates = [...reserved[j].dates].sort(Compare.date)
        reservations.push({
          start: dates[0],
          end: dates[dates.length - 1],
          name: reserved[j].name,
          paid: reserved[j].paid,
          roomId: rooms[i].roomId
        })
      }
    }
    return reservations
  }

  renderBooking = array =>
    array.map((booking, i) =>
      <Booking
        key={i}
        start={booking.start}
        end={booking.end}
        name={booking.name}
        paid={booking.paid}
        roomId={booking.roomId}
      />
    )

  render() {
    const reservations = this.state.reservations
    return (
      <Grid>
        <Today>
          <h1>Today</h1>
          {reservations &&
            this.renderBooking(reservations.filter(Compare.isToday))}
        </Today>

        <Tomorrow>
          <h1>Tomorrow</h1>
          {reservations &&
            this.renderBooking(reservations.filter(Compare.isTomorrow))}
        </Tomorrow>

        <RestDays>
          <h1>Upcoming</h1>
          {reservations &&
            this.renderBooking(
              reservations.filter(Compare.isFuture).sort(Compare.startDates)
            )}
        </RestDays>
      </Grid>
    )
  }
}

export default withRouter(Bookings)
