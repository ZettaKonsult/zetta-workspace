export default props => {
  const { oneRow, date: currentDate } = props

  let result = []
  result = oneRow ? [...result] : [...result, ...previousDates(currentDate)]
  result = [...result, ...getDaysInMonth(currentDate)]
  result = oneRow ? [...result] : [...result, ...comingDates(currentDate)]
  return result
}

const getDaysInMonth = date => {
  var year = date.getFullYear()
  var month = date.getMonth()
  var newDate = new Date(year, month, 1)
  var days = []
  while (newDate.getMonth() === month) {
    days.push(new Date(newDate))
    newDate.setDate(newDate.getDate() + 1)
  }
  return days
}

const comingDates = date => {
  const weekday = new Date(date.getFullYear(), date.getMonth() + 1).getUTCDay()
  let result = []

  if (weekday === 0) {
    return result
  }

  let dateN = 1
  for (let i = weekday; i < 7; i++) {
    result.push(new Date(date.getFullYear(), date.getMonth() + 1, dateN++))
  }

  return result
}

const previousDates = date => {
  const day = new Date(date.getFullYear(), date.getMonth(), 1)
  const weekday = day.getUTCDay() - 1
  let result = []

  for (let i = weekday; i >= 0; i--) {
    result.push(new Date(day.getFullYear(), day.getMonth(), -i))
  }
  return result
}

/*
<DateTile
  oneRow={this.props.oneRow}
  onClick={e => this.props.select(e)}
  date={this.state.currentDate}
  selectedDates={
    this.props.selectedDates ? this.props.selectedDates : []
  }
  reservedDates={
    this.props.reservedDates ? this.props.reservedDates : []
  }
/>
*/
