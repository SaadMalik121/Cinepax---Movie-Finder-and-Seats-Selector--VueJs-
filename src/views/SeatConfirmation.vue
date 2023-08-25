<template>
  <div>
    <div class="center-container">
      <img :src="selectedMovie.image" alt="" class="img_style" />
    </div>
    <div class="confirmation_container">
      <h2>Please Confirm</h2>
      <p>Are you sure you want to book ticket for</p>

      <div class="info_outer_container">
        <div class="info_container">
          <div class="movie-info">
            <p class="heading">Movie</p>
            <p class="value">{{ selectedMovie.name }}</p>
          </div>
          <div class="movie-info">
            <p class="heading">Price</p>
            <p class="value">{{ selectedMovie.totalPrice }}</p>
          </div>
          <div class="movie-info">
            <p class="heading">Timing:</p>
            <p class="value">{{ selectedMovie.selectedScreen.timing }}</p>
          </div>
          <div class="movie-info">
            <p class="heading">Booked Seats</p>
            <p class="value">{{ selectedMovie.requiredSeats }}</p>
          </div>
        </div>

        <div class="info_container">
          <div class="movie-info">
            <p class="heading">Selected Seats</p>
            <p class="value seat-container">
              <span
                class="seat"
                v-for="selectedSeat in selectedMovie.selectedSeats"
                >{{ selectedSeat }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="center-container">
      <button @click="bookingConfirmation" class="btn">Confirm Seats</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedMovie() {
      const movieId = this.$route.params.movieId;
      const screenId = this.$route.params.screenId;

      return this.$store.getters.getSelectedMovie(movieId, screenId);
    },
  },
  methods: {
    bookingConfirmation() {
      const movieId = parseInt(this.$route.params.movieId);
      const screenId = parseInt(this.$route.params.screenId);

      const movieData = this.$store.getters.getMovieById(movieId);
      const screenData = this.$store.getters.getScreenById(movieId, screenId);

      this.$store.commit("addBooking", {
        bookedScreen: screenData,
        bookedMovie: movieData,
        selectedSeats: this.selectedMovie.selectedSeats,
        totalPrice: this.selectedMovie.totalPrice,
        userId: JSON.parse(localStorage.getItem("user")).id,
        numOfSeats: this.selectedMovie.requiredSeats,
      });
      this.$store.commit("bookingConfirmation", {
        movieId,
        screenId,
        selectedSeats: this.selectedMovie.selectedSeats,
      });

      alert("Your seats booked successfully, Thank you!");
      this.$router.push("/my_bookings");
    },
  },
};
</script>

<style scoped>
.img_style {
  width: 80%;
  height: 70vh;
}
.confirmation_container {
  background-color: rgb(36, 35, 35);
  padding: 20px;
  margin: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
p {
  font-size: 20px;
  font-style: normal;
}
.heading {
  color: rgb(77, 76, 76);
  font-weight: bold;
}
.value {
  font-size: 20px;
}

.info_container {
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  flex-wrap: wrap;
}
.seat-container {
  margin-top: 10px;
}
.seat {
  background-color: gray;
  padding: 5px 10px;
  box-shadow: 2px 1px 9px rgb(151, 150, 150);
  border: 1px dashed rgb(95, 39, 39);
}
.info_outer_container {
  box-shadow: 0px 0px 2px rgb(151, 150, 150);
  width: 70%;
  padding: 10px;
  margin: 20px;
  background-color: rgb(33, 33, 33);
  padding-bottom: 20px;
}
</style>
