<template>
  <div class="main_container">
    <div class="left_container">
      <div class="center-container">
        <h1 class="header">
          Welcome to Movies <span style="color: rgb(249, 85, 85)">Planet</span>
        </h1>
        <h2>Login to your account</h2>
        <!-- <p>Please login to your account to get movies data</p> -->
      </div>
      <form @submit.prevent="registerUser" class="form_container">
        <div>
          <p>Enter Email</p>
          <input type="email" placeholder="Enter Email" v-model="email" />
        </div>
        <div>
          <p>Enter Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            v-model="password"
          />
        </div>
        <div>
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
          />
        </div>
        <div class="btn_container">
          <button class="btn">Sign up</button>
        </div>
      </form>
    </div>
    <div class="right_container">
      <img src="/public/cover.jpg" alt="" class="image_style" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    registerUser() {
      if (
        this.email == "" ||
        this.password == "" ||
        this.confirmPassword == ""
      ) {
        alert("Please fill all the fields");
      } else if (this.password != this.confirmPassword) {
        alert("Passwords do not match");
      } else {
        this.$store.commit("registerUser", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.main_container {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.left_container {
  width: 50%;
  margin-top: 2%;
  margin-left: 2%;
}
.right_container {
  width: 30%;
  background-color: rgb(37, 37, 37);
  height: 80vh;
  border: 2px double rgb(40, 39, 39);
}
p {
  font-style: normal;
  font-size: 18px;
  margin-top: 10px;
}
input {
  padding: 10px 20px;
  width: 90%;
  margin-left: 20px;
  margin-top: 10px;
}

.btn {
  margin-top: 20px;
  width: 90%;
}
.center-container {
  flex-direction: column;
}
.form_container {
  width: 90%;
  background-color: rgb(33, 33, 33);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
}
.btn_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
input:focus {
  border: 2px solid rgb(243, 105, 105);
  outline: 0;
}
.image_style {
  width: 100%;
  height: 79vh;
  object-fit: cover;
}
</style>
