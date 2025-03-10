<template>
    <nav>
      <ul>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cats/delete">Delete a Cat</RouterLink>
        <RouterLink to="/cats/edit">Edit a Cat</RouterLink>
        <RouterLink to="/cats/add">Add a Cat</RouterLink>
      </ul>
    </nav>
</template>

<style>
nav {
  width: 100%;
  padding: 20px;
  position:sticky;
  border: 1px solid #A12B44;
  background-color: #A12B44;
  top: 0;
  z-index: 0;
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
  color: #F4AFAB;
}

nav a:hover {
  color: honeydew;
}

</style>