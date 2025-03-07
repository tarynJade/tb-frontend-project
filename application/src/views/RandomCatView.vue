<template>
    <NavigationComponent/>
    <h1></h1>
    <div v-if="randomCat" class="cat-container">
        <img :src="randomCat.image_url" :alt="randomCat.breed">
        <h2>{{ randomCat.breed }}</h2>
        <p>{{ randomCat.description }}</p>
        <p>{{ randomCat.temperament }}</p>
        <p>{{ randomCat.hypoallergenic }}</p>
        </div>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
export default {
name: 'RandomCatView',
  components: {NavigationComponent},
  data() {
    return {
      randomCat: null,
      error: null
    }
  },
  methods: {
    async getRandomCat() {
      try {
        const response = await fetch('/api/get_cats')

        if (!response.ok) throw new Error(`Error: ${response.status}`)

        const data = await response.json()

        this.randomCat = data[Math.floor(Math.random() * data.length)];
      } catch (error) {
        console.error('Error:', error)
        this.error = 'Failed to load cat breeds.'
      }
    }
  },
  mounted() {
    this.getRandomCat()
  }
}

</script>

<style>

</style>