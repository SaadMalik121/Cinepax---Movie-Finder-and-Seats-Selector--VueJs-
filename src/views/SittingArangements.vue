<template>
  <div>
    <div class="image_container">
      <img :src="movie.image" alt="movie_img" class="movie-img" />
    </div>

    <div class="seat_selection_container">
      <h1>Select your seats</h1>
      <div class="seats_status_container">
        <div class="status_container">
          <div class="selected_seat_status"></div>
          Selected Seats
        </div>

        <div class="status_container">
          <div class="available_seat_status"></div>
          Available Seats
        </div>

        <div class="status_container">
          <div class="booked_seat_status"></div>
          BookedSeats
        </div>
      </div>
      <div class="seats-display">
        <SeatSelection
          :booked-seats="bookedSeats"
          :selected-seats="selectedSeats"
          @toggle-seat="toggleSeat"
        />
      </div>
      <RouterLink
        :to="`/seat_confirmation/${movieId}/${screenId}`"
        v-if="isSelectRequiredSeats"
      >
        <div class="center-container">
          <button class="btn next_btn" @click="setSelectedSeatData">
            Next
          </button>
        </div>
      </RouterLink>
      <div v-else class="note_container">
        <p>
          Please select <span class="bold_text">{{ requiredSeats }} Seats</span>
          to move to next step
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SeatSelection from "../components/sittingArangement/SeatSelection.vue";
export default {
  components: {
    SeatSelection,
  },
  data() {
    return {
      // bookedSeats: ["A1", "B3", "C5"],
      selectedSeats: [],
    };
  },
  methods: {
    toggleSeat(seatNumber) {
      if (this.selectedSeats.includes(seatNumber)) {
        this.selectedSeats = this.selectedSeats.filter((seat) => {
          return seat !== seatNumber;
        });
      } else if (this.selectedSeats.length >= this.requiredSeats) {
        alert("Not select more than " + this.selectedSeats.length + " seats");
      } else {
        this.selectedSeats.push(seatNumber);
      }
    },
    setSelectedSeatData() {
      this.$store.commit("setSelectedSeatData", {
        selectedSeats: this.selectedSeats,
        movieId: this.movieId,
        screenId: this.screenId,
      });
    },
  },
  props: ["movieId", "screenId"],
  computed: {
    bookedSeats() {
      return this.$store.getters.getBookedSeats(
        parseInt(this.movieId), //movieId
        parseInt(this.screenId) //screenId
      );
    },
    movie() {
      const movieId = parseInt(this.movieId);
      return this.$store.getters.getMovieById(movieId);
    },
    requiredSeats() {
      return this.$store.getters.getRequiredSeats;
    },
    isSelectRequiredSeats() {
      return this.selectedSeats.length == this.requiredSeats;
    },
  },
};
</script>

<style scoped>
.seat_selection_container {
  background-color: rgba(40, 40, 40, 0.758);
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}

.movie-img {
  width: 90%;
  height: 300px;
  object-fit: cover;
  margin-top: 20px;
}
.image_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.seats_status_container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(27, 26, 26);
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
}
.selected_seat_status,
.available_seat_status,
.booked_seat_status {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.available_seat_status {
  background-color: rgb(74, 73, 73);
}

.booked_seat_status {
  background-color: rgb(244, 159, 12);
}
.selected_seat_status {
  background-color: green;
}
.status_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.seats-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}
.next_btn {
  width: 80%;
  background-color: rgb(67, 67, 67);
}
.next_btn:hover {
  width: 80%;
  background-color: rgb(245, 94, 94);
}
.center-container {
  margin-top: 20px;
}
.note_container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.bold_text {
  font-weight: bold;
  color: rgb(239, 60, 60);
}
</style>
