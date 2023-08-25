import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import MovieCard from "../components/movie/MovieCard.vue";
import Checkout from "../views/Checkout.vue";
import Login from "../views/Login.vue";
import MovieDetails from "../views/MovieDetails.vue";
import MoviesList from "../views/MoviesList.vue";
import Signup from "../views/Signup.vue";
import ContactUs from "../views/ContactUs.vue";
import NotFound from "../views/NotFound.vue";
import BookSeats from "../views/BookSeats.vue";
import MyBookings from "../views/MyBookings.vue";
import SeatConfirmation from "../views/SeatConfirmation.vue";
import SittingArangement from "../views/SittingArangements.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/movie_details/:id",
      name: "movie_details",
      component: MovieDetails,
    },
    {
      path: "/movies_list",
      name: "movies_list",
      component: MoviesList,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/sitting_arangement/:movieId/:screenId",
      name: "sitting_arangement",
      component: SittingArangement,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/contact_us",
      name: "contact_us",
      component: ContactUs,
    },
    {
      path: "/my_bookings",
      name: "my_bookings",
      component: MyBookings,
      meta: { requiresAuth: true },
    },
    // {
    //   path: "/book_seat/:id",
    //   component: BookSeats,
    // },
    {
      path: "/book_seat/:movieId/:screenId",
      name: "book_seat",
      meta: { requiresAuth: true },
      component: BookSeats,
    },
    {
      path: "/seat_confirmation/:movieId/:screenId",
      name: "seat_confirmation",
      component: SeatConfirmation,
      meta: { requiresAuth: true },
    },
    {
      path: "/:notFound",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
