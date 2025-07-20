<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  pet: Object,
});

const flipped = ref(false);
const router = useRouter();

const imageUrl = new URL(`../assets/${props.pet.image}`, import.meta.url).href;

// Navegar al formulario de adopción
const adoptPet = () => {
  router.push({
    path: "/require",
    query: {
      nombre: props.pet.name,
      imagen: props.pet.image
    }
  });
};
</script>

<template>
  <div class="flip-card" @click="flipped = !flipped">
    <div class="flip-card-inner" :class="{ flipped }">
      <div class="flip-card-front">
        <v-card flat class="text-center pa-4">
          <v-img :src="imageUrl" height="200" cover class="mb-2" />
          <div class="text-h6">{{ pet.name }}</div>
          <div class="text-body-2">{{ pet.age }}</div>
        </v-card>
      </div>

      <div class="flip-card-back">
        <v-card
          flat
          class="text-left pa-4 d-flex flex-column justify-space-between"
        >
          <div>
            <div class="text-h6 mb-2">{{ pet.name }}</div>
            <p><strong>Edad:</strong> {{ pet.age }}</p>
            <p><strong>Peso:</strong> {{ pet.weight }} kg</p>
            <p><strong>Sexo:</strong> {{ pet.gender }}</p>
            <p><strong>Tamaño:</strong> {{ pet.size }}</p>
          </div>

          <v-btn color="primary" block class="mt-4" @click.stop="adoptPet">
            ¡Adoptar!
          </v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  perspective: 1000px;
  cursor: pointer;
  width: 100%;
  height: 300px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.flip-card-inner.flipped {
  transform: rotateX(180deg);
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

.flip-card-back {
  transform: rotateX(180deg);
}
@media (min-width: 1024px) {
  .flip-card {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
