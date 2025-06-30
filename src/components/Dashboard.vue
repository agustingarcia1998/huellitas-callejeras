<script setup>
import PetCard from './PetCard.vue';

const pets = [
  {
    id: 1,
    nombre: 'Tito',
    edad: '2 años',
    raza: 'Labrador',
    imagen: 'imagen'
  },
  {
    id: 2,
    nombre: 'Nilo',
    edad: '3 años',
    raza: 'Callejero',
    imagen: 'imagen'
  }
]
</script>

<template>
  <div >
    <h1>🐶 Mascotas en Adopción</h1>
    
    <div>
      <PetCard
        v-for="pet in pets"
        :key="pet.id"
        :nombre="pet.nombre"
        :edad="pet.edad"
        :raza="pet.raza"
        :imagen="pet.imagen"
      />
    </div>
  </div>
</template>

<style scoped>



</style>
