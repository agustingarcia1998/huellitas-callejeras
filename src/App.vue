<script setup>
import SideBar from './components/SideBar.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-layout>
      <Sidebar />
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>

</style>
