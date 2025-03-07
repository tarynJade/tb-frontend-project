<template>
  <NavigationComponent />
  <button @click="sortCats">Sort Cats </button>
  <div class="breeds">
    <div class="cat-list">
      <div v-for="cat in cats" :key="cat.id" class="cat-card">
        <router-link :to="'/cat/' + cat.breed">
          <img :src="cat.image_url" :alt="cat.breed">
          <h3>{{ cat.breed }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent.vue";

export default {
  name: 'CatsView',
  components: { NavigationComponent },
  
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
        this.cats = data
      } catch (error) {
        console.error('Error:', error)
        this.error = 'Failed to load cat breeds.'
      }
    },
      sortCats() {
        if(this.cats.length === 0) {
          console.log("No cats to sort");
        }
        this.cats.sort((a, b) => {
          let catA = a.breed.toLowerCase(),
              catB = b.breed.toLowerCase();
          if (catA < catB) {
            return -1;
          }
          if (catA > catB) {
            return 1;
          }
          return 0;
        });
      },
      
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
  padding: 0;
  margin: 0;
}

.cat-card {
  width: 250px;
  margin: 20px;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid #A12B44;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #A12B44;
  text-align: center;
}

.cat-card img {
  width: 100%;
  height: 80%;
  border-radius: 10px;
}

.cat-card h3 {
  color:bisque;
  background-color: #A12B44;
  font-size: 100%;
  border: 2px solid #A12B44;
  border-radius: 10px;
  padding: 10px;
}

a {
  text-decoration: none;
}

button{
  margin: 10px;
  padding: 15px 30px;
  color: beige;
  border-radius: 10px;
  background-color: #A12B44;
  border: 0;
  font-weight: 700;
  cursor: pointer;
}

</style>