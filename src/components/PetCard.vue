<script setup>
defineProps(["nombre", "edad", "raza", "imagen"]);
</script>

<template>
  <div class="card">
    <img :src="imagen" alt="Foto de mascota" />
    <h2>{{ nombre }}</h2>
    <p>{{ raza }}</p>
    <p>{{ edad }}</p>
  </div>
</template>

<style scoped>
.card {
  height: 200px;
  width: 300px;
  padding: 1rem;
  color: black;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  background: #fff;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}
</style>
