<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdoptionsStore } from '@/stores/adoptions' 
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const store = useAdoptionsStore()
const auth = useAuthStore()

auth.loadCurrentUser()

const petName = computed(() => route.query.name || 'a pet')
const petImage = computed(() => route.query.image)

const imageUrl = computed(() => {
  if (petImage.value) {
    return new URL(`../assets/${petImage.value}`, import.meta.url).href
  }
  return null
})

// Form fields
const name = ref('')
const email = ref('')
const reason = ref('')

// Load saved data if redirected from login
onMounted(() => {
  const savedData = localStorage.getItem('adoptionForm')
  if (savedData) {
    const { name: n, email: e, reason: r } = JSON.parse(savedData)
    if (!auth.currentUser) {
      name.value = n
      email.value = e
    }
    reason.value = r
    localStorage.removeItem('adoptionForm')
  }

  // If logged in, fill in the user info
  if (auth.currentUser) {
    name.value = auth.currentUser.name
    email.value = auth.currentUser.email
  }
})

function submitForm() {
  // If not logged in, save data and redirect to login
  if (!auth.currentUser) {
    localStorage.setItem(
      'adoptionForm',
      JSON.stringify({
        name: name.value,
        email: email.value,
        reason: reason.value,
      })
    )

    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.fullPath,
      },
    })
    return
  }

  // If logged in, use their info
  const newApplication = {
    userName: auth.currentUser.name,
    email: auth.currentUser.email,
    reason: reason.value,
    pet: petName.value,
    image: petImage.value,
    date: new Date().toLocaleString()
  }

  store.addApplication(newApplication)

  alert(`¡Gracias ${auth.currentUser.name}! Tu solicitud para adoptar a ${petName.value} fue enviada.`)

  reason.value = ''

  router.push('/')
}
</script>

<template>
  <div class="requirements-container">
    <h1>Requisitos para adoptar</h1>
    <ul class="requirements-list">
      <li>Tener más de 21 años</li>
      <li>Contar con un espacio adecuado</li>
      <li>Comprometerse al cuidado del animal</li>
      <li>Firmar un contrato de adopción</li>
    </ul>

    <div v-if="imageUrl" class="pet-info">
      <v-img :src="imageUrl" height="200" cover class="mb-4" />
      <h2>Formulario de adopción para {{ petName }}</h2>
    </div>

    <div v-if="auth.currentUser" class="logged-in-user">
      Estás logueado como <strong>{{ auth.currentUser.name }}</strong>
      (<strong>{{ auth.currentUser.email }}</strong>).
    </div>

    <form @submit.prevent="submitForm" class="adoption-form">
      <v-text-field
        label="Tu nombre"
        v-model="name"
        :readonly="auth.currentUser"
        required
      />

      <v-text-field
        label="Correo Electrónico"
        v-model="email"
        :readonly="auth.currentUser"
        type="email"
        required
      />

      <v-textarea
        label="¿Por qué querés adoptar?"
        v-model="reason"
        required
      />

      <v-btn type="submit" color="primary">Enviar solicitud</v-btn>
    </form>
  </div>
</template>

<style scoped>
.requirements-container {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}

.requirements-list {
  padding-left: 1.5rem;
  margin-bottom: 2rem;
}

.pet-info {
  text-align: center;
  margin-bottom: 2rem;
}

.logged-in-user {
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #333;
}

.adoption-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>