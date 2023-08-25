<template>
  <div class="details-component">
    <div class="details">
      <div class="left-container">
        <img :src="movie.image" alt="movie_img" class="movie-img" />
        <br />
        <button class="btn" @click="openTrailer">View Trailer</button>
        <!-- <RouterLink :to="`/book_seat/${movie.id}`">
          <button class="btn">Book Ticket</button></RouterLink
        > -->
        <div v-for="screen in movie.screens">
          <RouterLink :to="`/book_seat/${movie.id}/${screen.id}`">
            <button class="btn">
              Screen-{{ screen.id }} | {{ screen.timing }}
            </button></RouterLink
          >
        </div>
      </div>

      <div class="movie-info">
        <h1>{{ movie.name }}</h1>

        <div class="info-row">
          <h4>Description</h4>
          <p>{{ movie.description }}</p>
        </div>

        <div class="info-row">
          <h4>Cast</h4>
          <div class="cast-members">
            <div class="cast-member" v-for="cast in movie.cast" :key="cast">
              {{ cast }}
            </div>
          </div>
        </div>

        <div class="form-control">
          <div class="info-row">
            <h4>Price</h4>
            <p>{{ movie.price }}</p>
          </div>
          <div class="info-row">
            <h4>Status</h4>
            <p>{{ movie.status }}</p>
          </div>
        </div>

        <div class="form-control">
          <div class="info-row">
            <h4>Language</h4>
            <p>{{ movie.language }}</p>
          </div>
          <div class="info-row">
            <h4>Duration</h4>
            <p>{{ movie.duration }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  methods: {
    openTrailer() {
      window.open(this.movie.trailer_link, "_blank");
    },
  },
  computed: {
    movie() {
      const movieId = parseInt(this.$route.params.id);
      return this.$store.getters.getMovieById(movieId);
    },
  },

  components: {
    RouterLink,
  },
};
</script>

<style scoped>
.details {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  overflow-x: hidden;
}

.movie-img {
  width: 90%;
  height: 300px;
  object-fit: cover;
  margin-top: 20px;
}

.movie-info {
  padding-top: 20px;
  width: 40%;
}

.btn-containers {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  width: 100%;
}

.btn {
  padding: 10px 52px;
  border: 0;
  outline: 0;
  color: white;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(66, 65, 65, 0.502);
  cursor: pointer;
  width: 90%;
}

.btn-edit {
  background-color: green;
}

.btn-delete {
  background-color: red;
}

.info-row {
  margin-top: 5px;
  padding: 15px 0px;
}

h4 {
  color: rgba(114, 114, 114, 0.82);
  font-style: italic;
  font-size: 17px;
  margin-bottom: 10px;
}

.form-control {
  display: flex;
  justify-content: space-between;
}
.cast-members {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}

.cast-member {
  padding: 10px 15px;
  border: 1px solid rgba(19, 19, 19, 0.539);
  background-color: rgb(61, 60, 60);
  border-radius: 5px;
  margin: 5px;
}

.left-container {
  width: 50%;
  object-fit: fill;
}
</style>
