export default {
  actions: {},
  state: {
    bookings: [
      {
        screenId: null,
        movieId: null,
        selectedSeats: null,
        totalPrice: null,
        userId: null,
      },
    ],
  },
  getters: {
    myBookingsList: (state) => (userId) => {
      return state.bookings.filter((booking) => booking.userId === userId);
    },
  },
  mutations: {
    addBooking(state, bookings) {
      state.bookings.push(bookings);
      console.log(bookings);
    },
  },
};
