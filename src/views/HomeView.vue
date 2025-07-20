<script setup>
import PetCard from '@/components/PetCard.vue'
import SideBar from '@/components/SideBar.vue'
import { onMounted } from 'vue'
import { usePetsStore } from '@/stores/pets'

const petsStore = usePetsStore()

onMounted(() => {
  petsStore.loadPets()
})
</script>

<template>
  <v-container fluid class="d-flex pa-0 fill-height home-layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <SideBar />
    </div>

    <!-- Main Content -->
    <v-container fluid class="pa-6">
      <h1 class="text-center text-h4 mb-6">🐶 Mascotas en Adopción</h1>
      <v-row dense>
        <v-col
          v-for="pet in petsStore.pets"
          :key="pet.id"
          cols="12"
          sm="6"
          md="4"
        >
          <PetCard :pet="pet" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.home-layout {
  background-color: #f7f9fb;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
</style>