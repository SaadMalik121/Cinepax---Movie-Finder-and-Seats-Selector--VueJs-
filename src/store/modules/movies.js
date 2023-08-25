import DummyMovies from "../../assets/DummyData/DummyMovies";

export default {
  actions: {},
  state: {
    moviesToShow: "All",
    selectedGenre: "all",
    // requiredSeats: 1,
    selectedMovie: {
      movieId: null,
      requiredSeats: 1, //num of seats
      totalPrice: 0,
      screenId: null,
      selectedSeats: null,
    },
    movies: DummyMovies,
  },
  getters: {
    getAllMovies(state) {
      let filteredMovies = [];
      if (state.moviesToShow == "All") filteredMovies = state.movies;
      else if (state.moviesToShow == "Now Showing")
        filteredMovies = state.movies.filter(
          (movie) => movie.status == "Now Showing"
        );
      else
        filteredMovies = state.movies.filter(
          (movie) => movie.status == "Coming Soon"
        );

      //based on genre
      if (state.selectedGenre != "all") {
        return filteredMovies.filter(
          (movie) => movie.genre == state.selectedGenre
        );
      } else {
        return filteredMovies;
      }
    },

    firstSixMovies(state) {
      let filteredMovies = [];
      if (state.moviesToShow == "All") filteredMovies = state.movies;
      else if (state.moviesToShow == "Now Showing")
        filteredMovies = state.movies.filter(
          (movie) => movie.status == "Now Showing"
        );
      else
        filteredMovies = state.movies.filter(
          (movie) => movie.status == "Coming Soon"
        );

      if (state.selectedGenre != "all") {
        filteredMovies = filteredMovies.filter(
          (movie) => movie.genre == state.selectedGenre
        );
      }
      return filteredMovies.slice(0, 6);
    },
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
    getRequiredSeats: (state) => {
      return state.selectedMovie.requiredSeats;
    },
    getBookedSeats: (state) => (movieId, screenId) => {
      const movieIndex = state.movies.findIndex((m) => m.id === movieId);
      const screenIndex = state.movies[movieIndex].screens.findIndex(
        (s) => s.id === screenId
      );
      return state.movies[movieIndex].screens[screenIndex].bookedSeats;
    },
    getScreenById: (state) => (movieId, screenId) => {
      const movieIndex = state.movies.findIndex((m) => m.id === movieId);
      const screenIndex = state.movies[movieIndex].screens.findIndex(
        (s) => s.id === screenId
      );

      return state.movies[movieIndex].screens[screenIndex];
    },

    getSelectedMovie: (state) => (movieId, screenId) => {
      const movieIndex = state.movies.findIndex((m) => m.id == movieId);
      const screenIndex = state.movies[movieIndex].screens.findIndex(
        (s) => s.id == screenId
      );

      const { name, image, price } = state.movies[movieIndex];
      const selectedScreen = state.movies[movieIndex].screens[screenIndex];
      return {
        name,
        image,
        selectedScreen,
        requiredSeats: state.selectedMovie.requiredSeats,
        totalPrice:
          state.selectedMovie.requiredSeats * price +
          50 * state.selectedMovie.requiredSeats,
        selectedSeats: state.selectedMovie.selectedSeats,
      };
    },
  },
  mutations: {
    setMoviesToShow: (state, payload) => {
      state.moviesToShow = payload;
    },
    changeGenre(state, genre) {
      state.selectedGenre = genre;
    },
    incrementSeats(state, payload) {
      if (
        state.selectedMovie.requiredSeats >= payload.selectedScreen.seatsLeft
      ) {
        alert(
          "Can not select more than " +
            payload.selectedScreen.seatsLeft +
            "seats"
        );
      } else {
        state.selectedMovie.requiredSeats++;
      }
    },
    decrementSeats(state, payload) {
      if (state.selectedMovie.requiredSeats > 1)
        state.selectedMovie.requiredSeats--;
      else {
        alert("Can not select less than 1 seat");
      }
    },
    setSelectedSeatData(state, payload) {
      state.selectedMovie = {
        ...state.selectedMovie,
        ...payload,
      };
    },

    bookingConfirmation(state, { movieId, screenId, selectedSeats }) {
      console.log(screenId);
      const movieIndex = state.movies.findIndex((m) => m.id == movieId);
      const screenIndex = state.movies[movieIndex].screens.findIndex(
        (s) => s.id == screenId
      );

      state.movies[movieIndex].screens[screenIndex].bookedSeats.push(
        ...selectedSeats
      );

      state.movies[movieIndex].screens[screenIndex].seatsLeft =
        state.movies[movieIndex].screens[screenIndex].seatsLeft -
        selectedSeats.length;

      //Reinitialize values after submission
      state.selectedMovie = {
        movieId: null,
        requiredSeats: 1, //num of seats
        totalPrice: 0,
        screenId: null,
        selectedSeats: null,
      };
    },
  },
};
