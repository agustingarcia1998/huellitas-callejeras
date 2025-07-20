<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

function login() {
  const ok = auth.login(email.value, password.value)
  if (ok) {
  const redirectTo = route.query.redirect || '/'
  router.push(redirectTo)
} else {
    error.value = 'Email o contraseña incorrectos'
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Iniciar sesión</h2>
    <v-text-field v-model="email" label="Email" />
    <v-text-field v-model="password" label="Contraseña" type="password" />
    <v-btn color="primary" @click="login">Entrar</v-btn>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p>¿No tenés cuenta? <router-link to="/register">Registrate</router-link></p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}
</style>