<template>
  <ShowMovies :movies="getAllMovies" :shouldSearchBarVisible="true" />
</template>

<script>
import ShowMovies from "../components/movie/ShowMovies.vue";
export default {
  components: { ShowMovies },
  computed: {
    getAllMovies() {
      return this.$store.getters.getAllMovies;
    },
  },
};
</script>

<style></style>
