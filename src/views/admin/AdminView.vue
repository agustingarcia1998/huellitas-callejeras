<script setup>
import SideBar from '@/components/SideBar.vue'
</script>


<template>
  <v-container fluid class="d-flex pa-0 fill-height">
    <!-- Sidebar -->
    <div class="sidebar">
      <SideBar />
    </div>

    <!-- Contenido dinámico de las rutas hijas -->
    <v-container fluid class="pa-6">
      <router-view />
    </v-container>
  </v-container>
</template>

<style scoped>
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
</style>