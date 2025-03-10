<template>
  <NavigationComponent />
  <div class="cat-info">
    <div v-if="randomCat" class="cat-container">
      <div class="cat-image-container">
        <img :src="randomCat.image_url" :alt="randomCat.breed" class="cat-image" />
      </div>
      <div class="cat-details-container">
        <h3 class="cat-breed">{{ randomCat.breed }}</h3>
        <div class="cat-details">
          <p><strong>Description:</strong> {{ randomCat.description }}</p>
          <p><strong>Temperament:</strong> {{ randomCat.temperament }}</p>
          <p><strong>Hypoallergenic:</strong> {{ randomCat.hypoallergenic ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="loading">Loading random cat...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRandomCat } from '@/services/catService'; // Import the service
import NavigationComponent from '@/components/NavigationComponent.vue';

const randomCat = ref(null);
const error = ref(null);

const fetchRandomCat = async () => {
  try {
    randomCat.value = await getRandomCat();
  } catch (err) {
    console.error('Error:', err);
    error.value = err.message;
  }
};

onMounted(() => {
  fetchRandomCat();
});
</script>

<style scoped>
.cat-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
}

  .cat-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
}

.cat-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color:bisque;
  border-radius: 10px;
  padding: 20px;
  max-width: 900px;
  width: 100%;
  margin: auto;
}

.cat-image-container {
  max-width: 300px;
  margin-right: 20px;
}

.cat-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.cat-details-container {
  max-width: 550px;
  align-items: center;
}

.cat-breed {
  font-size: 40px;
  font-weight: bold;
  color: rgb(38, 49, 49);
  margin-bottom: 20px;
  text-align: center;
}

.cat-details {
  color: #555;
}

.cat-details p {
  margin: 10px;
}

</style>