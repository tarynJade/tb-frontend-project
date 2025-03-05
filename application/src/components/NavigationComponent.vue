<template>
    <nav>
      <ul>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/breeds">Cat Breeds</RouterLink>
        <RouterLink to="/breed-of-the-day">Cat Breed Of The Day</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </ul>
    </nav>
</template>

<script>
export default {
  name: 'NavigationComponent'
}
</script>

<style scoped>
nav {
  width: 100%;
  padding: 10px 0;
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 10;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

nav a {
  font-size: 25px;
  font-weight: bolder;
  text-decoration: none;
  color: #A12B44;
}

nav a:hover {
  color: honeydew;
}
</style>