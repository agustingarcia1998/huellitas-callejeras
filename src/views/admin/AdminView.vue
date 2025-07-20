<script setup>
import { useAdopcionesStore } from "@/stores/adopciones";

const store = useAdopcionesStore();
store.cargarDesdeLocalStorage();
</script>

<template>
  <div class="admin-container">
    <h1>Solicitudes de adopción</h1>

    <v-table v-if="store.solicitudes.length">
      <thead>
        <tr>
          <th>Mascota</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Motivo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sol, i) in store.solicitudes" :key="i">
          <td>{{ sol.mascota }}</td>
          <td>{{ sol.nombreUsuario }}</td>
          <td>{{ sol.email }}</td>
          <td>{{ sol.motivo }}</td>
          <td>{{ sol.fecha }}</td>
        </tr>
      </tbody>
    </v-table>

    <p v-else>No hay solicitudes todavía.</p>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}
</style>
