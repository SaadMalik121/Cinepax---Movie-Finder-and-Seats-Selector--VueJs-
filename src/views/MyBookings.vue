<template>
  <div class="my-bookings-container">
    <h2 class="page-title">My Bookings</h2>
    <div class="sorting-controls">
      <div></div>
      <div>
        <label for="sort">Sort by Price:</label>
        <select id="sort" v-model="sortBy">
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>
    <div v-if="sortedBookings.length === 0" class="no-bookings-message">
      No bookings found.
    </div>
    <div v-else>
      <div
        class="booking-card"
        v-for="booking in sortedBookings"
        :key="booking.id"
      >
        <div class="card-content">
          <div class="image-container">
            <img :src="booking.bookedMovie.image" alt="" class="image" />
          </div>
          <div class="booking-details">
            <div class="field-group">
              <div class="field">
                <p class="field-title">Movie:</p>
                <p class="field-value">{{ booking.bookedMovie.name }}</p>
              </div>
              <div class="field">
                <p class="field-title">Screen:</p>
                <p class="field-value">{{ booking.bookedScreen.id }}</p>
              </div>
            </div>
            <div class="field-group">
              <div class="field">
                <p class="field-title">Seats:</p>
                <p class="field-value">
                  {{ booking.selectedSeats.join(", ") }}
                </p>
              </div>
              <div class="field">
                <p class="field-title">Total Price:</p>
                <p class="field-value">{{ booking.totalPrice }}</p>
              </div>
            </div>
            <div class="field">
              <p class="field-title">Time:</p>
              <p class="field-value">{{ booking.bookedScreen.timing }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortedBookings: [],
      sortBy: "asc",
    };
  },
  computed: {
    // bookings() {
    //   const sortedBookings = this.$store.getters
    //     .myBookingsList(this.loggedInUser.id)
    //     .slice(); // Copy the array
    //   sortedBookings.sort((a, b) => a.totalPrice - b.totalPrice); // Sort by totalPrice
    //   return sortedBookings;
    // },
    sortedBookings() {
      const sortedBookings = this.$store.getters
        .myBookingsList(this.loggedInUser.id)
        .slice();
      sortedBookings.sort((a, b) => {
        const sortOrder = this.sortBy === "asc" ? 1 : -1;
        return sortOrder * (a.totalPrice - b.totalPrice);
      });
      return sortedBookings;
    },
    loggedInUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>
<style scoped>
.my-bookings-container {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 20px;
}

.no-bookings-message {
  font-size: 20px;
  color: #999999;
  text-align: center;
  padding: 30px;
}

.booking-card {
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}

.image-container {
  margin-right: 20px;
}

.image {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}
.field {
  margin-bottom: 10px;
}

.field-title {
  font-size: 14px;
  color: #999999;
  margin-bottom: 5px;
}

.field-value {
  font-size: 16px;
  color: #ffffff;
}
.field-group {
  display: flex;
  justify-content: space-between;
}

.field {
  flex-basis: 48%; /* Adjust the value to control spacing */
}

.field-value {
  font-size: 16px;
  color: #fff;
}

.booking-details {
  width: 100%;
}
.sorting-controls {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

select {
  padding: 6px;
  font-size: 14px;
}
</style>
