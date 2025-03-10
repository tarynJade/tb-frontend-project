<template>
  <NavigationComponent />
  <div class="cat-info">
    <div v-if="cat" class="cat-container">
      <img :src="cat.image_url" :alt="cat.breed" />
      <h3>{{ cat.breed }}</h3>
      <div class="cat-details">
        <p>Description: {{ cat.description }}</p>
        <p>Temperament: {{ cat.temperament }}</p>
        <p>Hypoallergenic: {{ cat.hypoallergenic }}</p>
        <p></p>
        <p></p>
      </div>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>Loading cat information...</div>
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

<style>
img {
  width: 250px;
  height: 250px;
  border-radius: 10px;
}
</style>
