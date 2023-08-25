<template>
  <div class="container">
    <div class="image-container">
      <img :src="movie.image" alt="" class="img-style" />
    </div>

    <div class="amount-container">
      <h2>Cinema Name</h2>
      <h4>Select Ticket</h4>
      <p class="para">
        Select the number and type of tickets you wish to buy. Please note seats
        are reserved on a best available basis. You can buy a maximum of 10
        tickets per transaction. Convenience Fee of Rs 50 per ticket will be
        charged.
      </p>

      <div class="amount-form">
        <div class="form-header">
          <h4>Ticket</h4>
          <h4>Cost</h4>
          <h4>Quantity</h4>
          <h4>SubTotal</h4>
        </div>

        <div class="ticket-row">
          <h4>E-STANDARD</h4>
          <h4>{{ movie.price }}</h4>
          <div>
            <button class="decrement" @click="decrement">-</button>
            <input type="text" class="quantity-input" v-model="requiredSeats" />
            <button class="increment" @click="increment">+</button>
          </div>
          <h4>{{ totalPrice }}</h4>
        </div>

        <div class="ticket-row">
          <h4>Convenience Fee</h4>
          <h4>50</h4>
          <div>{{ requiredSeats }}</div>
          <h4>{{ calculateConveniecePrice }}</h4>
        </div>

        <div class="subtotal">SeatsLeft :{{ getScreenById.seatsLeft }}</div>
        <div class="subtotal">SubTotal :{{ totalPriceWithConvenienceFee }}</div>

        <!-- <SittingArangements :requiredSeats="requiredSeats" /> -->
        <RouterLink :to="`/sitting_arangement/${movie.id}/${screenId}`">
          <button class="next-button btn">Next</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import SittingArangements from "./SittingArangements.vue";
export default {
  components: { RouterLink, SittingArangements },
  props: [],

  methods: {
    increment() {
      this.$store.commit("incrementSeats", {
        selectedScreen: this.selectedScreen,
        movie: this.movie,
      });
    },
    decrement() {
      this.$store.commit("decrementSeats", {
        selectedScreen: this.selectedScreen,
        movie: this.movie,
      });
    },
  },
  computed: {
    movie() {
      const movieId = parseInt(this.$route.params.movieId);
      return this.$store.getters.getMovieById(movieId);
    },
    totalPrice() {
      return this.requiredSeats * this.movie.price;
    },
    calculateConveniecePrice() {
      return this.requiredSeats * 50;
    },
    totalPriceWithConvenienceFee() {
      return this.requiredSeats * this.movie.price + 50 * this.requiredSeats;
    },
    requiredSeats() {
      return this.$store.getters.getRequiredSeats;
    },
    selectedScreen() {
      let screenId = this.$route.params.screenId;
      return this.movie.screens.find((screen) => screen.id == screenId);
    },
    screenId() {
      return this.$route.params.screenId;
    },
    getScreenById() {
      const movieId = parseInt(this.$route.params.movieId);
      const screenId = parseInt(this.$route.params.screenId);

      return this.$store.getters.getScreenById(movieId, screenId);
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #f0f0f0; */
  padding: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #3a3a3b;
  width: 100%;
}
.img-style {
  width: 100%;
  height: 70vh;
  object-fit: contain;
}

.amount-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgb(41, 41, 41);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.para {
  margin: 20px 0;
}

.amount-form {
  width: 100%;
  background-color: rgba(20, 20, 20, 0.452);
  padding: 20px;
  border-radius: 5px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.ticket-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.quantity-input {
  width: 50px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  text-align: center;
}

.subtotal {
  text-align: right;
  margin-top: 10px;
  font-weight: bold;
}

.next-button {
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #3a3a3b;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  transition: background-color 0.3s ease;
}
.next-button:hover {
  background-color: rgb(245, 90, 90);
}

.increment,
.decrement {
  background-color: rgb(87, 86, 86);
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border: 0;
  color: white;
  width: 40px;
}
</style>
