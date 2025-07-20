<script setup>
import { ref } from "vue";
import { usePetsStore } from "@/stores/pets";

const petsStore = usePetsStore();

const name = ref("");
const age = ref("");
const image = ref("");
const gender = ref("");
const weight = ref("");
const size = ref("");

function addPet() {
  if (
    name.value &&
    age.value &&
    image.value &&
    gender.value &&
    weight.value &&
    size.value
  ) {
    petsStore.addPet({
      name: name.value,
      age: age.value,
      image: image.value,
      gender: gender.value,
      weight: Number(weight.value),
      size: size.value,
    });

    // Limpiar formulario
    name.value = "";
    age.value = "";
    image.value = "";
    gender.value = "";
    weight.value = "";
    size.value = "";
  }
}
</script>

<template>
  
  <div class="add-pet-container">
    <h2>Agregar Mascota</h2>
    <form @submit.prevent="addPet">
      <input v-model="name" placeholder="Nombre" />
      <input v-model="age" placeholder="Edad" />
      <input
        v-model="image"
        placeholder="Nombre del archivo de imagen (ej: perrito.jpeg)"
      />
      <input v-model="gender" placeholder="Género" />
      <input v-model="weight" placeholder="Peso" type="number" />
      <input v-model="size" placeholder="Tamaño" />
      <button type="submit">Agregar</button>
    </form>
  </div>
</template>

<style scoped>
.add-pet-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 24px;
  font-size: 28px;
  text-align: center;
  color: #333;
}

form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
}

button[type="submit"] {
  grid-column: span 2;
  padding: 14px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #388e3c;
}
</style>
