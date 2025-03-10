<template>
  <AdminNavigationComponent />
  <div class="cat-form">
    <h2>Edit Cat</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="cat-select">Select a Cat:</label>
        <select
          id="cat-select"
          v-model="selectedCatId"
          @change="loadCatDataWhenCatSelected"
        >
          <option v-for="cat in allCats" :key="cat.id" :value="cat.id">
            {{ cat.breed }} (ID: {{ cat.id }})
          </option>
        </select>
      </div>

      <div>
        <label for="breed">Breed:</label>
        <input type="text" id="breed" v-model="cat.breed" required />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="cat.description"
          required
        ></textarea>
      </div>

      <div>
        <label for="temperament">Temperament:</label>
        <textarea
          id="temperament"
          v-model="cat.temperament"
          required
        ></textarea>
      </div>

      <div>
        <label for="hypoallergenic">Hypoallergenic:</label>
        <input
          type="checkbox"
          id="hypoallergenic"
          v-model="cat.hypoallergenic"
        />
      </div>

      <div>
        <label for="image_url">Image URL:</label>
        <input type="url" id="image_url" v-model="cat.image_url" />
      </div>

      <button type="submit" :disabled="!selectedCatId">Update Cat</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCats, getCatById, updateCat } from "@/services/catService";
import AdminNavigationComponent from "@/components/AdminNavigationComponent.vue";

const allCats = ref([]);
const selectedCatId = ref("");
const cat = ref({
  id: null,
  breed: "",
  description: "",
  temperament: "",
  hypoallergenic: false,
  image_url: "",
});

const error = ref(null);
const successMessage = ref(null);

const resetForm = () => {
  cat.value = cat;
  successMessage.value = null;
};

const loadAllCatsToDropdownMenu = async () => {
  try {
    allCats.value = await getCats();
  } catch (err) {
    error.value = "Failed to load cats.";
    console.error;
  }
};

const loadCatDataWhenCatSelected = async () => {
  if (!selectedCatId.value) {
    return;
  }

  try {
    const data = await getCatById(selectedCatId.value);
    if (!data) {
      error.value = "Cat not found.";
      return;
    }
    cat.value = { ...data };
    cat.value.id = selectedCatId.value;
    error.value = null;
  } catch (err) {
    error.value = "Failed to load cat data.";
    console.error(err);
  }
};

const submitForm = async () => {
  if (!selectedCatId.value) {
    error.value = "Please select a cat to update.";
    return;
  }

  try {
    await updateCat(cat.value);
    successMessage.value = "Cat updated successfully.";
    setTimeout(() => resetForm(), 2000);
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => {
  loadAllCatsToDropdownMenu();
});
</script>

<style scoped>
.cat-form {
  max-width: 500px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
}
</style>
