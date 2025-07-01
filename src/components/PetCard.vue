<script setup>
import imagen from "../assets/animal.png"

defineProps(["nombre", "edad", "raza", "imagen"]);
</script>

<template>
  <div class="card-container">
    <div class="card-img">
      <img :src="imagen" alt="Foto de mascota" />
    </div>
    <div class="card-info">
      <h2>{{ nombre }}</h2>
      <p>{{ raza }}</p>
      <p>{{ edad }}</p>
    </div>
  </div>
</template>

<style scoped>

.card-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 5px;

}

.card-info {
  height: 200px;
  width: 500px;
  padding: 1rem;
  color: black;
  border: 1px solid #ccc;
  text-align: center;
  background: #fff;
  border-radius: 6px;

}

img{
  width: 350px;
  height: 200px;
  border-radius: 6px;

}


/* .card img {
  
} */
</style>
