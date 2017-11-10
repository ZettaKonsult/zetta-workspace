export default props => {
  const { date, oneRow } = props

  const weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]
  let startDay = oneRow
    ? new Date(date.getFullYear(), date.getMonth(), 1).getUTCDay()
    : 0

  const length = oneRow
    ? new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    : 7

  const mapWeekdays = () => {
    let result = []
    for (let i = 0; i < length; i++) {
      result = [...result, weekdays[startDay++ % 7]]
    }
    return result
  }

  return mapWeekdays()
}
