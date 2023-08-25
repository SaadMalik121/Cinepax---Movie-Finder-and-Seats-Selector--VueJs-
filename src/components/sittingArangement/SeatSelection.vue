<template>
  <div class="seating-arrangement">
    <!-- Row to display seat numbers -->
    <div class="seat-row">
      <div class="seat"></div>
      <div v-for="seat in seatsPerRow" :key="seat" class="seat seat-number">
        {{ seat }}
      </div>
    </div>

    <!-- Seating rows -->
    <div v-for="row in rows" :key="row">
      <div class="seat seat-number">
        {{ row }}
      </div>
      <Seat
        v-for="seat in seatsPerRow"
        :key="seat"
        :seatNumber="`${row}${seat}`"
        :status="getSeatStatus(`${row}${seat}`)"
        @toggle-seat="toggleSeat"
      />
    </div>
  </div>
</template>

<script>
import Seat from "./Seat.vue";
export default {
  components: {
    Seat,
  },
  props: {
    bookedSeats: Array,
    selectedSeats: Array,
  },
  computed: {
    rows() {
      return ["A", "B", "C", "D", "E", "F"];
    },
    seatsPerRow() {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    },
  },
  methods: {
    getSeatStatus(seatNumber) {
      if (this.bookedSeats.includes(seatNumber)) {
        return "booked";
      } else if (this.selectedSeats.includes(seatNumber)) {
        return "selected";
      } else {
        return "available";
      }
    },
    toggleSeat(seatNumber) {
      this.$emit("toggle-seat", seatNumber);
    },
  },
};
</script>

<style scoped>
.seating-arrangement {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seat-row {
  display: flex;
  align-items: center;
  margin-left: 5px;
}

.seat {
  width: 40px;
  height: 40px;
  display: inline-block;
  margin: 5px;
  text-align: center;
  line-height: 40px;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
}

.seat-number {
  font-size: 12px;
  font-weight: bold;
}

.row-label {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}
</style>
