import React, { Component } from 'react'
import DateTile from './DateTile'
import MonthHeader from './MonthHeader'
import WeekDays from './WeekDays'

import Span from './Span'
import GRID from './GRID'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: this.props.date
    }
  }

  next() {
    const newDate = new Date(
      this.state.currentDate.getFullYear(),
      this.state.currentDate.getMonth() + 1
    )
    this.setState({
      currentDate: newDate
    })
  }

  prev() {
    const newDate = new Date(
      this.state.currentDate.getFullYear(),
      this.state.currentDate.getMonth() - 1
    )
    this.setState({
      currentDate: newDate
    })
  }

  renderWeekDays() {
    return WeekDays({
      date: this.state.currentDate,
      oneRow: this.props.oneRow
    }).map((day, i) =>
      <Span key={i} backgroundColor="LightSkyBlue">
        {this.props.oneRow ? day[0] : day}
      </Span>
    )
  }

  renderDates() {
    const array = DateTile({
      oneRow: this.props.oneRow,
      date: this.state.currentDate
    })
    return array.map((day, i) =>
      <Span
        id={day.toDateString()}
        key={i}
        backgroundColor={this.dateBackgroundColor(day, i)}
        onClick={this.props.select}
      >
        {day.getDate()}
      </Span>
    )
  }

  isDateInCurrentMonth = (day, i) =>
    !((i < 7 && day.getDate() > 24) || (i > 20 && day.getDate() < 7))

  isDateReserved = day =>
    this.props.reservedDates.indexOf(day.toDateString()) !== -1

  isDateSelected = day =>
    this.props.selectedDates.indexOf(day.toDateString()) !== -1

  dateBackgroundColor = (day, i) =>
    this.isDateReserved(day)
      ? 'lightcoral'
      : this.isDateSelected(day)
        ? 'LightSteelBlue'
        : this.isDateInCurrentMonth(day, i) ? 'white' : 'lightgrey'

  render() {
    const date = this.state.currentDate
    const size = this.props.oneRow
      ? new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      : '7'

    return (
      <div>
        {this.props.header
          ? <MonthHeader
              month={this.state.currentDate.getMonth()}
              year={this.state.currentDate.getFullYear()}
              next={() => this.next()}
              prev={() => this.prev()}
              headerTitle={this.props.headerTitle}
            />
          : ''}
        <GRID size={size}>
          {this.props.weekdays ? this.renderWeekDays() : ''}
          {this.renderDates()}
        </GRID>
      </div>
    )
  }
}

Calendar.defaultProps = {
  oneRow: false,
  header: false,
  weekdays: false,
  selectedDates: [],
  reservedDates: [],
  headerTitle: '',
  date: new Date()
}

export default Calendar
