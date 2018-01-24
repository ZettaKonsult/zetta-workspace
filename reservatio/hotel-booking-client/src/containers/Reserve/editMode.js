export const getReservedDates = (array, dateToEdit) => {
  let reservedDates = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].dates.indexOf(dateToEdit) === -1) {
      reservedDates = [...reservedDates, ...array[i].dates];
    }
  }
  return reservedDates;
};

export const getReservedArray = array => {
  let reservedDates = [];
  for (let i = 0; i < array.length; i++) {
    reservedDates = [...reservedDates, ...array[i].dates];
  }
  return reservedDates;
};

export const getBookings = (array, dateToEdit) => {
  let booking = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].dates.indexOf(dateToEdit) === -1) {
      booking = [...booking, array[i]];
    }
  }
  return booking;
};

export const getReservation = (array, dateToEdit) => {
  return array.find(item =>
    item.dates.find(date => new Date(date).getTime() === dateToEdit)
  );
};
