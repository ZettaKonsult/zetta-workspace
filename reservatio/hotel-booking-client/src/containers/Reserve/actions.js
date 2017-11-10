const toggleDate = (id, selectedDates) => {
  const i = selectedDates.indexOf(id)
  let arrayCopy = [...selectedDates]

  if (i === -1) {
    arrayCopy = [...selectedDates, id]
  } else {
    arrayCopy = [...selectedDates.slice(0, i), ...selectedDates.slice(i + 1)]
  }

  return arrayCopy
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
