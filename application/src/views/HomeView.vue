<template>
  <NavigationComponent />
  <div class="home">
    <HeaderComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import NavigationComponent from "@/components/NavigationComponent.vue";
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
}

</style>