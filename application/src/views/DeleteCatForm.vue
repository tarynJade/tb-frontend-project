<template>
  <AdminNavigationComponent />
  <div class="cat-form">
    <h2>Delete Cat</h2>
    <form @submit.prevent="submitForm">
      <label for="cat-select">Select a Cat To Delete:</label>
      <select id="cat-select" v-model="selectedCatId">
        <option v-for="cat in allCats" :key="cat.id" :value="cat.id">
          {{ cat.breed }} (ID: {{ cat.id }})
        </option>
      </select>
      <button type="submit">Delete Cat</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { deleteCat, getCats } from "@/services/catService";
import AdminNavigationComponent from "@/components/AdminNavigationComponent.vue";
import { ref } from "vue";

const allCats = ref([]);
const selectedCatId = ref(null);
const error = ref(null);
const successMessage = ref(null);

const loadAllCatsToDropdownMenu = async () => {
  try {
    allCats.value = await getCats();
  } catch (err) {
    error.value = "Failed to load cats.";
    console.error(err);
  }
};

const resetForm = () => {
  selectedCatId.value = null;
  successMessage.value = null;
  error.value = null;
};

const submitForm = async () => {
  if (!selectedCatId.value) {
    error.value = "Please select a cat.";
    return;
  }

  try {
    const catToDelete = allCats.value.find(
      (cat) => cat.id === selectedCatId.value
    );

    if (!catToDelete) {
      error.value = "Selected cat not found.";
      return;
    }

    await deleteCat(selectedCatId.value);
    successMessage.value = `Cat ${catToDelete.breed} deleted successfully!`;

    setTimeout(() => {
      resetForm();
    }, 1000);
  } catch (err) {
    error.value = `Failed to delete the cat: ${err.message}`;
  }
};

loadAllCatsToDropdownMenu();
</script>

<style>
.cat-form {
  margin: 2rem auto;
  padding: 1rem;
  width: 50%;
}
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 10px;
}
</style>
