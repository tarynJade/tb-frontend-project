<template>
  <NavigationComponent />
    
  <div class="search-container">
    <input
      type="text"
      class="search-input"
      v-model="searchQuery"
      placeholder="Enter breed to search"
    />
    <button @click="sortCats =!sortCats" >{{ sortButtonText }}</button>
  </div>

  <div class="breeds">
    <div class="cat-list">
      <div v-for="cat in displayedCats" :key="cat.id" class="cat-card">
        <router-link :to="'/cat/' + cat.id">
          <img :src="cat.image_url" :alt="cat.breed" />
          <h3>{{ cat.breed }}</h3>
        </router-link>
      </div>
    </div>
  </div>
  <div v-if="error">{{ error }}</div>
  <div v-if="loading">Loading cat information...</div>
</template>

<script setup>
import { ref, onMounted, computed} from "vue";
import { getCats, getHypoallegenicCats } from "@/services/catService";
import NavigationComponent from "@/components/NavigationComponent.vue";

const cats = ref([]);
const sortCats = ref(false);
const error = ref(null);
const loading = ref(true);
const searchQuery = ref(""); 

const getCatsFromService = async () => {
  try {
    cats.value = await getCats();
  } catch (err) {
    console.error("Error:", err);
    error.value = "Failed to load cat breeds.";
  } finally {
    loading.value = false;
  }
};

const displayedCats = computed(() => {
  let result = sortCats.value ? getHypoallegenicCats(cats.value) : cats.value;
  
  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    result = result.filter(cat => cat.breed.toLowerCase().includes(lowerCaseQuery));
  }
  return result;
});

const sortButtonText = computed(() => sortCats.value ? "All Cats" : "Hypoallegenic Cats");

onMounted(() => {
  getCatsFromService();
});
</script>

<style scoped>
.breeds {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cat-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.cat-card {
  width: 250px;
  margin: 20px;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #a12b44;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #a12b44;
  text-align: center;
}

.cat-card img {
  width: 100%;
  height: 80%;
  border-radius: 10px;
}

.cat-card h3 {
  color: bisque;
  background-color: #a12b44;
  font-size: 100%;
  border: 2px solid #a12b44;
  border-radius: 10px;
  padding: 10px;
}

.search-container {
  display: flex;
  justify-content:space-around;
  margin-top: 30px;  
}
.search-input {
  padding: 8px; 
  border-radius: 20px;
  border: 2px solid #a12b44;
  font-size: 0.9rem; 
  width: 300px;  
}

a {
  text-decoration: none;
}

button {
  margin: 10px;
  color: beige;
  border-radius: 10px;
  background-color: #a12b44;
  border: 0;
  font-weight: 700;
  cursor: pointer;
}
</style>
