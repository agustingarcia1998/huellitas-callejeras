<script setup>
import { usePetsStore } from "@/stores/pets";
import { ref } from "vue";

const petsStore = usePetsStore();
const mensaje = ref("");
const eliminarMascota = (id) => {
  petsStore.removePet(id);
  mensaje.value = "Mascota eliminada correctamente";
  setTimeout(() => {
    mensaje.value = "";
  }, 3000);
};
</script>

<template>
  <div class="remove-pet-container">
    <h2>Remover Mascotas</h2>

    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>

    <transition-group name="fade" tag="ul" class="pets-list">
      <li v-for="pet in petsStore.pets" :key="pet.id" class="pet-item">
        <img
          :src="`/src/assets/${pet.image}`"
          alt="Pet Image"
          class="pet-image"
        />
        <div class="pet-info">
          <strong>{{ pet.name }}</strong> ({{ pet.age }}) - {{ pet.gender }} -
          {{ pet.size }}
        </div>
        <button @click="eliminarMascota(pet.id)">Eliminar</button>
      </li>
    </transition-group>
  </div>
</template>

<style scoped>
.remove-pet-container {
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

.mensaje {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.pets-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pet-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.3s, transform 0.3s;
}

.pet-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pet-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.pet-info {
  flex-grow: 1;
  font-size: 16px;
  color: #333;
}

button {
  padding: 10px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d32f2f;
}

/* Transición fade al eliminar */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
