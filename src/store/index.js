import { createStore } from "vuex";
import users from "./modules/users";
import movies from "./modules/movies";
import bookings from "./modules/bookings";

const store = createStore({
  modules: {
    users: users,
    movies: movies,
    bookings: bookings,
  },
  state: {
    userId: 6,
  },
  getters: {},
  mutations: {},
});

export default store;
