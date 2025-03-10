<template>
  <NavigationComponent />
  <button @click="sortCats">Sort Cats</button>

  <div class="breeds">
    <div class="cat-list">
      <div v-for="cat in cats" :key="cat.id" class="cat-card">
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

<script>
import { getCats, getHypoallegenicCats } from "@/services/catService";
import NavigationComponent from "@/components/NavigationComponent.vue";

export default {
  name: "CatsView",
  components: { NavigationComponent },

  data() {
    return {
      cats: [],
      error: null,
      loading: true,
    };
  },
  methods: {
    async getCatsFromService() {
      try {
        this.cats = await getCats();
      } catch (error) {
        console.error("Error:", error);
        this.error = "Failed to load cat breeds.";
      } finally {
        this.loading = false;
      }
    },
    sortCats() {
      this.cats = getHypoallegenicCats(this.cats);
    },
  },
  mounted() {
    this.getCatsFromService();
  },
};
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

a {
  text-decoration: none;
}

button {
  margin: 10px;
  padding: 15px 30px;
  color: beige;
  border-radius: 10px;
  background-color: #a12b44;
  border: 0;
  font-weight: 700;
  cursor: pointer;
}
</style>
