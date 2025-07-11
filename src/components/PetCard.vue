<script setup>
import { computed } from "vue";

const props = defineProps(["nombre", "edad", "tamaño", "imagen"]);

const imageUrl = computed(() => {
  try {
    return new URL(`../assets/${props.imagen}`, import.meta.url).href;
  } catch (error) {
    return new URL(`../assets/default.png`, import.meta.url).href;
  }
});
</script>

<template>
  <div class="card-container">
    <div class="card-img">
      <img :src="imageUrl" alt="Foto de mascota" />
    </div>
    <div class="card-info">
      <div class="title">
        <h2>{{ nombre }}</h2>
      </div>
      <p>{{ edad }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 5px;
}

.card-info {
  padding: 1rem;
  color: black;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ccc;
  text-align: center;
  flex: 1;
}

.card-img {
  width: 100%;
  max-width: 350px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 6px;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 6px;
}
</style>
