import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Calendar from '../../components/Calendar/';
import Layout from './Layout';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      rooms: null,
      reservedDates: null,
    };
  }

  async componentWillMount() {
    try {
      // const results = await this.getReservation()
      const results = await this.props.database.listAllRooms(
        this.props.userToken
      );

      const sortedResults = results.concat().sort(this.compareRoomId);
      this.setState({
        rooms: sortedResults,
      });
    } catch (e) {
      console.error(e);
    }
  }
  compareRoomId = (a, b) => Number(a.roomId) > Number(b.roomId);

  render() {
    const rooms = this.state.rooms;
    let dates = [];
    for (let idRoom in rooms) {
      let reservedDates = rooms[idRoom].reserved;
      dates[idRoom] = [];
      for (let id in reservedDates) {
        dates[idRoom] = [...dates[idRoom], ...reservedDates[id].dates];
      }
    }
    return (
      <Layout>
        {dates.map((dates, i) => (
          <Calendar
            key={i}
            header
            weekdays
            reservedDates={dates}
            headerTitle={'room' + this.state.rooms[i].roomId}
          />
        ))}
      </Layout>
    );
  }
}
export default withRouter(Overview);
