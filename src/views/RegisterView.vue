<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const nombre = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

function register() {
  const ok = auth.register(nombre.value, email.value, password.value)
  if (ok) {
    router.push('/') // redirigir al home o a donde quieras después del registro
  } else {
    error.value = 'El email ya está registrado'
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Registrarse</h2>
    <v-text-field v-model="nombre" label="Nombre completo" />
    <v-text-field v-model="email" label="Email" type="email" />
    <v-text-field v-model="password" label="Contraseña" type="password" />
    <v-btn color="primary" @click="register">Crear cuenta</v-btn>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p>¿Ya tenés cuenta? <router-link to="/login">Iniciá sesión</router-link></p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}
</style>