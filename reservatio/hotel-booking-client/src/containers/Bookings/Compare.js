const date = (a, b) => new Date(a) > new Date(b)

const isToday = booking => booking.start === new Date().toDateString()

const isTomorrow = booking =>
  booking.start ===
  new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  ).toDateString()

const isFuture = booking => new Date(booking.start) > new Date()

const startDates = (a, b) => new Date(a.start) > new Date(b.start)

export default {
  date,
  isToday,
  isTomorrow,
  isFuture,
  startDates
}
