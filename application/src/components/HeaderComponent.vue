<template>
  <header>
    <div class="header-box">
      <img id="cat-image" :src="catImage" alt="A cat">
      <div class="header-text">
        <h1 class="main-header">The Cat Encyclopedia.</h1>
        <h3 class="tagline">Discover the Purrfect Breed: All the Facts About Your Favourite Cats</h3>
      </div>
    </div>
  </header>
</template>

<script>
import catImage from '@/assets/cat.png';
export default {
  name: 'HeaderComponent',
  data() {
    return {
      catImage: catImage
    }
  }
}
</script>

<style scoped>
.header-box {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

#cat-image {
  width: 200px;
  height: 300px;
  border-radius: 25%;
}

.header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-header {
  font-size: 80px;
  color: #232222;
  margin: 2px;
}

.tagline {
  font-size: 25px;
  color: #5c5a5a;
  margin: 2px;
}
</style>