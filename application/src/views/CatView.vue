<template>
  <NavigationComponent />
  <div class="cat-info">
    <div v-if="cat" class="cat-container">
      <div class="cat-image-container">
        <img :src="cat.image_url" :alt="cat.breed" class="cat-image" />
      </div>
      <div class="cat-details-container">
        <h3 class="cat-breed">{{ cat.breed }}</h3>
        <div class="cat-details">
          <p><strong>Description:</strong> {{ cat.description }}</p>
          <p><strong>Temperament:</strong> {{ cat.temperament }}</p>
          <p><strong>Hypoallergenic:</strong> {{ cat.hypoallergenic ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="loading">Loading cat information...</div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue"; 
import { useRoute } from "vue-router";
import { getCatById } from "@/services/catService";
import NavigationComponent from "@/components/NavigationComponent.vue";

const route = useRoute();
const cat = ref(null);
const error = ref(null);

onMounted(async () => {
  const id = route.params.id; 
  try {
    cat.value = await getCatById(id);
  } catch (error) {
    console.error("Error:", error);
    error.value = "Failed to load cat.";
  }
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

.cat-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color:bisque;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 900px;
  width: 100%;
  margin: auto;
}

.cat-image-container {
  flex: 1;
  max-width: 300px;
  margin-right: 20px;
}

.cat-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.cat-details-container {
  flex: 2;
  max-width: 550px;
  align-items: center;
}

.cat-breed {
  font-size: 40px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.cat-details {
  font-size: 1rem;
  color: #555;
}

.cat-details p {
  margin: 10px 0;
}

.cat-details strong {
  font-weight: bold;
}

.error {
  color: red;
  font-size: 1.2rem;
}

.loading {
  font-size: 1.2rem;
  color: #555;
}
</style>
