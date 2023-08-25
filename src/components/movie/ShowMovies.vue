<template>
  <div class="search_container" v-if="shouldSearchBarVisible">
    <h2>Search Required Movies</h2>
    <input
      type="text"
      placeholder="Search Movie"
      class="search_input"
      v-model="searchMovie"
    />
  </div>
  <button
    class="btn"
    @click="toggleShowing('All')"
    :class="{ active: selectedCategory === 'All' }"
  >
    All
  </button>

  <button
    class="btn"
    @click="toggleShowing('Now Showing')"
    :class="{ active: selectedCategory === 'Now Showing' }"
  >
    Now Showing
  </button>
  <button
    class="btn"
    @click="toggleShowing('Coming soon')"
    :class="{ active: selectedCategory === 'Coming soon' }"
  >
    Coming Soon
  </button>

  <div class="movies_container">
    <div class="genre-dropdown-container">
      <select class="genre-dropdown" @change="changeGenre">
        <option v-for="genre in genres" :value="genre.value" :key="genre.value">
          {{ genre.label }}
        </option>
      </select>
    </div>
    <div class="mainContainer">
      <!-- <div v-for="movie in movies" v-if="movies.length > 0"> -->
      <div v-for="movie in moviesToShow" v-if="moviesToShow.length > 0">
        <RouterLink :to="`/movie_details/${movie.id}`">
          <MovieCard
            :name="movie.name"
            :description="movie.description"
            :genre="movie.genre"
            :price="movie.price"
            :id="movie.id"
            :image="movie.image"
            :trailer_link="movie.trailer_link"
            :key="movie.id"
          />
        </RouterLink>
      </div>
      <div v-else>No Movies Found</div>
    </div>
  </div>
</template>

<script>
import MovieCard from "../movie/MovieCard.vue";

export default {
  data() {
    return {
      searchMovie: null,
      selectedCategory: "All",
      genres: [
        { label: "All Genres", value: "all" },
        { label: "Action", value: "action" },
        { label: "Drama", value: "drama" },
        { label: "Horror", value: "horror" },
        { label: "Comedy", value: "comedy" },
      ],
    };
  },
  computed: {
    moviesToShow() {
      if (!this.searchMovie) {
        return this.movies;
      } else {
        return this.movies.filter((movie) =>
          movie.name.toLowerCase().includes(this.searchMovie.toLowerCase())
        );
      }
    },
  },

  methods: {
    toggleShowing(showMovie) {
      console.log(this.searchMovie);
      this.selectedCategory = showMovie;
      this.$store.commit("setMoviesToShow", showMovie);
    },
    changeGenre(e) {
      const selectedGenre = e.target.selectedOptions[0].value;
      this.$store.commit("changeGenre", selectedGenre);
    },
  },
  props: ["movies", "shouldSearchBarVisible"],
  components: { MovieCard, MovieCard },
};
</script>

<style scoped>
.mainContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.genre-dropdown {
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(40, 39, 39);
  color: white;
  cursor: pointer;
}

.genre-dropdown-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
}
.movies_container {
  position: relative;
  background-color: rgb(41, 40, 40);
  padding: 50px 20px;
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: white;
}

.active {
  background-color: rgb(243, 79, 79);
}

.search_container {
  padding: 10px 20px;
  background-color: rgba(36, 36, 36, 0.578);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
}
h2 {
  width: 100%;
  margin-bottom: 20px;
}
.search_input {
  padding: 10px 20px;
  width: 100%;
  outline: 0;
}
.search_input:focus {
  border: 2px solid rgb(244, 129, 129);
}
</style>
