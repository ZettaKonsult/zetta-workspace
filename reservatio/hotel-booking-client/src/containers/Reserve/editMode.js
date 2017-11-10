export const editMode = (room, startTime) => ({
  dateToEdit: new Date(startTime).toDateString(),
  reserved: [...room.reserved],

  getReservedDates() {
    let reservedDates = []
    for (let i = 0; i < this.reserved.length; i++) {
      if (this.reserved[i].dates.indexOf(this.dateToEdit) === -1) {
        reservedDates = [...reservedDates, ...this.reserved[i].dates]
      }
    }
    return reservedDates
  },

  getBookings() {
    let booking = []
    for (let i = 0; i < this.reserved.length; i++) {
      if (this.reserved[i].dates.indexOf(this.dateToEdit) === -1) {
        booking = [...booking, this.reserved[i]]
      }
    }
    return booking
  },

  getReservation() {
    let reservation = {}

    for (let i = 0; i < this.reserved.length; i++) {
      if (this.reserved[i].dates.indexOf(this.dateToEdit) !== -1) {
        reservation = {
          selectedDates: this.reserved[i].dates,
          name: this.reserved[i].name,
          email: this.reserved[i].email,
          phone: this.reserved[i].phone,
          paid: this.reserved[i].paid
        }
      }
    }
    return reservation
  }
})
