<template>
  <div className="nav-container">
    <ul>
      <li><img src="/logo.png" alt="" className="logo" /></li>

      <div className="links-container">
        <RouterLink to="/" active-class="active-link">
          <li>Home</li></RouterLink
        >
        <RouterLink to="movies_list" active-class="active-link">
          <li>Movies</li></RouterLink
        >
        <RouterLink
          to="my_bookings"
          active-class="active-link"
          v-if="isAuthenticated"
        >
          <li>My Bookings</li></RouterLink
        >
        <RouterLink to="contact_us" active-class="active-link">
          <li>Contact us</li></RouterLink
        >

        <!-- <RouterLink to="contact_us" active-class="active-link"> -->

        <!-- </RouterLink> -->
      </div>

      <button class="btn logout" v-if="isAuthenticated" @click="logoutUser">
        Logout
      </button>

      <div className="links-container" v-else>
        <RouterLink to="/login">
          <button class="btn login">Login</button></RouterLink
        >
        <RouterLink to="/signup">
          <button class="btn register">Register</button></RouterLink
        >
      </div>
    </ul>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: { RouterLink },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit("setAuthentication", false);
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.logo {
  width: 120px;
}
.nav-container {
  background-color: rgb(37, 37, 37);
  padding: 10px 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 8px rgba(37, 37, 37, 0.623);
  border-radius: 10px;
  border: 1px solid rgb(52, 52, 52);
}

ul {
  list-style: none;
  display: flex;
  /* justify-content: space-between; */
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
}
li {
  cursor: pointer;
}
.logo {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif, "Gill Sans MT",
    Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
}

.finder {
  color: rgb(239, 108, 108);
}

.add_btn {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif, "Gill Sans MT",
    Calibri, "Trebuchet MS", sans-serif;
  cursor: pointer;
  color: rgb(239, 108, 108);
  font-size: 25px;
}

a {
  text-decoration: none;
  color: aliceblue;
}
.active-link {
  color: rgb(248, 117, 117);
  font-weight: 900;
}
a:hover {
  color: rgb(245, 57, 57);
}
.links-container {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
}
.login {
  color: rgb(239, 108, 108);
  border: 1px solid white;
  color: white;
}
.logout {
  background-color: rgb(239, 108, 108);
}
.register {
  background-color: rgb(239, 108, 108);
}
</style>
