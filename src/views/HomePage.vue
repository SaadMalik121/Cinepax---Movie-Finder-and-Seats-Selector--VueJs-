<template>
  <div>
    <div class="image_container">
      <img src="/movie.jpg" alt="" class="landscape_movie" />
    </div>

    <div>
      <ShowMovies :movies="firstSixMovies" />
    </div>
    <div class="center-container">
      <RouterLink
        to="movies_list"
        style="width: 100%; display: flex; justify-content: center"
      >
        <button class="btn allMoviebtn">Show All Movies</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import ShowMovies from "../components/movie/ShowMovies.vue";
import { RouterLink } from "vue-router";

export default {
  components: { ShowMovies, RouterLink },
  computed: {
    firstSixMovies() {
      return this.$store.getters.firstSixMovies;
    },
  },
};
</script>

<style>
.btn {
  background-color: rgb(40, 39, 39);
  border: 0px;
  padding: 15px 50px;
  color: white;
  margin: 2px;
  border-radius: 5px;
  cursor: pointer;
}
a {
  text-decoration: none;
}
.btn:hover {
  background-color: rgb(243, 79, 79);
}

.landscape_movie {
  width: 100%;
  margin-bottom: 12px;
  height: 400px;
}
.image_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.allMoviebtn {
  background-color: rgb(66, 65, 65);
  width: 90%;
  margin: 20px 0px;
}
.center-container {
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>
