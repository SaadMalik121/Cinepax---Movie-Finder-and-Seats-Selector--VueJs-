<template>
  <div
    :class="{
      seat: true,
      'selected-seat': selected,
      'available-seat': available,
      'booked-seat': booked,
    }"
    @click="toggleSeat"
  >
    {{ seatNumber }}
  </div>
</template>

<script>
export default {
  //   props: {
  //     index: Number,
  //     status: String,
  //   },
  props: ["seatNumber", "status"],
  computed: {
    seatLabel() {
      //   return this.index + 1;
      return this.seatNumber;
    },
    selected() {
      return this.status === "selected";
    },
    available() {
      return this.status === "available";
    },
    booked() {
      return this.status === "booked";
    },
  },
  methods: {
    toggleSeat() {
      if (this.available || this.selected) {
        this.$emit("toggle-seat", this.seatNumber);
      }
    },
  },
};
</script>

<style scoped>
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

.selected-seat {
  background-color: rgb(3, 99, 3);
  color: white;
}

.available-seat {
  background-color: rgb(74, 73, 73);
}

.booked-seat {
  background-color: rgb(244, 159, 12);
  color: white;
}
</style>
