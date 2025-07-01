<script setup>
import PetCard from './PetCard.vue';
import SideBar from './SideBar.vue';


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
    raza: 'Mestizo',
    imagen: 'imagen'
  },
  {
    id: 3,
    nombre: 'Fido',
    edad: '6 meses',
    raza: 'Boxer',
    imagen: 'imagen'
  },
  {
    id: 4,
    nombre: 'Rocky',
    edad: '17 años',
    raza: 'Pequinés',
    imagen: 'imagen'
  },
  {
    id: 5,
    nombre: 'Rabanito',
    edad: '5 años',
    raza: 'Galgo',
    imagen: 'imagen'
  },
  {
    id: 6,
    nombre: 'Pepi',
    edad: '6 años',
    raza: 'Boyero de berna',
    imagen: 'imagen'
  }


]
</script>

<template>
  <div >
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
        :raza="pet.raza"
        :imagen="pet.imagen"
      />
    </div>
  </div>
</template>

<style scoped>

.pet-container{
  display: grid;
  gap: 5px;
}

h1{
  display: flex;
  justify-content: center;
}

</style>
