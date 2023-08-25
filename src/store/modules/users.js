export default {
  actions: {},
  state: {
    userId: 1,
    isAuthenticated: localStorage.getItem("user") !== null,
    users: [
      {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        password: "saad123",
        phone: "1234567890",
      },
    ],
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    isAuthanticated(state, { email, password }) {
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );
      if (user != undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        alert("Invalid username or password");
        localStorage.removeItem("user", user);
      }
    },
    registerUser(state, { email, password }) {
      const user = state.users.find((user) => user.email === email);
      if (user) {
        alert("User already exists");
      } else {
        state.users.push({ email, password, id: ++state.userId });
      }
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
};
