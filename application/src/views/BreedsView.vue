<template>
  <NavigationComponent />
  <div class="breeds">
    <div class="cat-list">
      <div v-for="cat in cats" :key="cat.id" class="cat-card">
        <img :src="cat.image_url" :alt="cat.breed">
        <h3>{{ cat.breed }}</h3>
        <p>{{ cat.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent.vue";

export default {
  name: 'BreedsView',
  components: {NavigationComponent},
  data() {
    return {
      cats: [],
      error: null
    }
  },
  methods: {
    async getCats() {
      try {
        const response = await fetch('/api/get_cats')
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        const data = await response.json()
        console.log('Fetched cats:', data)
        this.cats = data
      } catch (error) {
        console.error('Error:', error)
        this.error = 'Failed to load cat breeds.'
      }
    }
  },
  mounted() {
    this.getCats()
  }
}
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
}

.cat-card {
  width: 300px;
  margin: 10px;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #A12B44;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #A12B44;
}

.cat-card img {
  width: 100%;
  border-radius: 10px;
}

.cat-card h3 {
  color: #A12B44;
  font-size: 20px;
}

.cat-card p {
  color: #5c5a5a;
  font-size: 15px;
}

</style>