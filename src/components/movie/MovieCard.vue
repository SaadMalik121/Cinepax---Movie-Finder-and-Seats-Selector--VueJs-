<template>
  <div class="movie_container">
    <img :src="image" alt="movie_image" class="movie_image" />
    <div class="underline"></div>
    <div class="movie_information">
      <h2>{{ name }}</h2>
      <div class="movie_info">
        <p>Genre: {{ genre }}</p>
        <p>Price: {{ price }}</p>
      </div>
    </div>
    <div class="btn_container">
      <button class="btn" @click="openTrailer">View Trailer</button>
      <button class="btn">Book Seat</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openTrailer() {
      window.open(this.trailer_link, "_blank");
    },
  },
  props: [
    "name",
    "description",
    "genre",
    "price",
    "id",
    "image",
    "trailer_link",
  ],
};
</script>

<style>
.movie_container {
  border-radius: 20px;
  box-shadow: 0px 0px 8px gray;
  width: fit-content;
  margin: 10px;
  background-color: rgb(52, 52, 52);
  padding: 10px;
  margin-top: 30px;
}

.movie_container:hover {
  animation: item_animation 1s ease-in-out;
  box-shadow: 0px 0px 8px rgba(255, 89, 0, 0.452);
}

@keyframes item_animation {
  0% {
    scale: 1;
    box-shadow: 0px 0px 8px gray;
  }

  75% {
    scale: 1.01;
    box-shadow: 0px 0px 8px orange;
  }

  100% {
    scale: 1;
    box-shadow: 0px 0px 8px rgba(255, 89, 0, 0.452);
  }
}

.movie_image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
}

.underline {
  height: 1px;
  width: 80%;
  background-color: gray;
  margin: auto;
}

.movie_information {
  padding: 15px 20px;
  flex-wrap: wrap;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 20px;
}

p {
  margin-top: 3px;
  font-size: 15px;
  font-style: italic;
}

h2 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;
  margin-top: 3px;
  font-style: italic;
  word-wrap: break-word;
  width: 250px;
}
.movie_info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.btn_container {
  display: flex;
  flex-direction: column;
}
</style>
