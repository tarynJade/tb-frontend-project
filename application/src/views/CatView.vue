<template>
  <NavigationComponent />
  <div class="cat-info">
    <div v-if="cat" class="cat-container">
      <img :src="cat.image_url" :alt="cat.breed">
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

<script>
import NavigationComponent from "@/components/NavigationComponent.vue";

export default {
  name: "CatView",
  components: { NavigationComponent },
  data() {
    return {
      cat: null,
      error: null
    };
  },
  methods: {
    async getCat() {
      try {
        const catBreed = this.$route.params.breed; 

        const response = await fetch(`/api/get_cat/${catBreed}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        this.cat = await response.json();

        if (!this.cat) {
          throw new Error("Cat not found");
        }
      } catch (error) {
        console.error("Error:", error);
        this.error = "Failed to load cat details.";
      }
    }
  },
  mounted() {
    this.getCat();
  }
};
</script>

<style>
img {
  width: 250px;
  height: 250px;
  border-radius: 10px;
}

</style>

  
