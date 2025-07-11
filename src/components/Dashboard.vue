<script setup>
import PetCard from './PetCard.vue';
import SideBar from './SideBar.vue';
import { pets } from '../../utils/pets';


</script>

<template>
  <div class="hola">
    <div>
      <SideBar/>
    </div>
    <h1>🐶 Mascotas en Adopción</h1>
    <div class="pet-container">
      <PetCard
        v-for="pet in pets"
        :key="pet.id"
        :nombre="pet.nombre"
        :edad="pet.edad"
        :tamaño="pet.tamaño"
        :imagen="pet.imagen"
      />
    </div>
  </div>
</template>

<style scoped>
.hola{
  background-color: rgba(0, 0, 0, 0.822);
}
.pet-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

h1{
  display: flex;
  justify-content: center;
} 


</style>
