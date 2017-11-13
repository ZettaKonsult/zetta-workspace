const toggleDate = (id, selectedDates) => {
  const i = selectedDates.indexOf(id)
  let arrayCopy = [...selectedDates]
  
  if (i === -1) {
    let pos = arrayCopy.findIndex(isDateLaterThan(id))
    pos = pos === -1 ? arrayCopy.length : pos
    arrayCopy = [...selectedDates.slice(0, pos), id, ...selectedDates.slice(pos)]
  } else {
    arrayCopy = [...selectedDates.slice(0, i), ...selectedDates.slice(i + 1)]
  }

  return arrayCopy
}

const isDateLaterThan = (date1) => (date2) =>
  new Date(date1).getTime() < new Date(date2).getTime()

export const isDatesConcurrent = (dates) => {
  let date = new Date(dates[0])

  for (let i = 1; i < dates.length; ++i) {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    let nextDate = new Date(dates[i])

    if (date.getTime() !== nextDate.getTime()) {
      return false
    }
  }
  return true
}

export const bookingMode = room => ({
  reserved: [...room.reserved],

  getReservedDates() {
    let reservedDates = []
    for (let i = 0; i < this.reserved.length; i++) {
      reservedDates = [...reservedDates, ...this.reserved[i].dates]
    }
    return reservedDates
  },

  getBookings() {
    return this.reserved
  },

  getReservation() {
    return {}
  }
})

export default toggleDate
