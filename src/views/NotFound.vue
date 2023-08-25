<template>
  <div class="mainDiv">
    <img src="/public/error-404.png" class="image" />
    <h2>
      Page not found. DO you want to visit home page.
      <RouterLink to="/" class="link"> Visit here</RouterLink>
    </h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.mainDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: rgb(45, 44, 44);
  padding: 50px 20px;
  border-radius: 10px;
}
.image {
  width: 300px;
}
h2 {
  color: rgb(87, 87, 87);
  width: 100%;
}
.link {
  color: orange;
}
</style>
