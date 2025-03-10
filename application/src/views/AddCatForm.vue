<template>
  <AdminNavigationComponent />
  <div class="cat-form">
    <h2>Add New Cat</h2>

    <form @submit.prevent="submitForm">

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
          type="text"
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

      <button type="submit">Add Cat</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { postCat } from "@/services/catService";
import AdminNavigationComponent from "@/components/AdminNavigationComponent.vue";

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

const submitForm = async () => {
  try {
    await postCat(
      cat.value.breed,
      cat.value.description,
      cat.value.temperament,
      cat.value.hypoallergenic,
      cat.value.image_url
    );
    successMessage.value = "Cat added successfully.";
    setTimeout(() => {
      resetForm();
    }, 2000);
  } catch (error) {
    error.value = error.message;
  }
};
</script>

<style>
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
textarea {
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
