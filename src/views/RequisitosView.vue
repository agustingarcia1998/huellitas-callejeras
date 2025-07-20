<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdopcionesStore } from '@/stores/adopciones'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const store = useAdopcionesStore()
const auth = useAuthStore()

auth.cargarUsuarioActual()

const nombreMascota = computed(() => route.query.nombre || 'una mascota')
const imagenMascota = computed(() => route.query.imagen)

const imagenUrl = computed(() => {
  if (imagenMascota.value) {
    return new URL(`../assets/${imagenMascota.value}`, import.meta.url).href
  }
  return null
})

// Formulario
const nombre = ref('')
const email = ref('')
const motivo = ref('')

// Recuperar datos si venimos del login
onMounted(() => {
  const datosGuardados = localStorage.getItem('formularioAdopcion')
  if (datosGuardados) {
    const { nombre: n, email: e, motivo: m } = JSON.parse(datosGuardados)
    if (!auth.usuarioActual) {
      nombre.value = n
      email.value = e
    }
    motivo.value = m
    localStorage.removeItem('formularioAdopcion')
  }

  // Si está logueado, llenar los datos
  if (auth.usuarioActual) {
    nombre.value = auth.usuarioActual.nombre
    email.value = auth.usuarioActual.email
  }
})

function enviarFormulario() {
  // Si no está logueado, guardar datos y redirigir
  if (!auth.usuarioActual) {
    localStorage.setItem(
      'formularioAdopcion',
      JSON.stringify({
        nombre: nombre.value,
        email: email.value,
        motivo: motivo.value,
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

  // Si está logueado, usar sus datos
  const nuevaSolicitud = {
    nombreUsuario: auth.usuarioActual.nombre,
    email: auth.usuarioActual.email,
    motivo: motivo.value,
    mascota: nombreMascota.value,
    imagen: imagenMascota.value,
    fecha: new Date().toLocaleString()
  }

  store.agregarSolicitud(nuevaSolicitud)

  alert(`¡Gracias ${auth.usuarioActual.nombre}! Tu solicitud para adoptar a ${nombreMascota.value} fue enviada.`)

  motivo.value = ''

   router.push('/')
}
</script>

<template>
  <div class="requisitos-container">
    <h1>Requisitos para adoptar</h1>
    <ul class="requisitos-lista">
      <li>Tener más de 21 años</li>
      <li>Contar con un espacio adecuado</li>
      <li>Comprometerse al cuidado del animal</li>
      <li>Firmar un contrato de adopción</li>
    </ul>

    <div v-if="imagenUrl" class="mascota-info">
      <v-img :src="imagenUrl" height="200" cover class="mb-4" />
      <h2>Formulario de adopción para {{ nombreMascota }}</h2>
    </div>

    <!-- Mensaje si el usuario está logueado -->
    <div v-if="auth.usuarioActual" class="usuario-logueado">
      Estás logueado como <strong>{{ auth.usuarioActual.nombre }}</strong>
      (<strong>{{ auth.usuarioActual.email }}</strong>).
    </div>

    <form @submit.prevent="enviarFormulario" class="formulario-adopcion">
      <v-text-field
        label="Tu nombre"
        v-model="nombre"
        :readonly="auth.usuarioActual"
        required
      />

      <v-text-field
        label="Email"
        v-model="email"
        :readonly="auth.usuarioActual"
        type="email"
        required
      />

      <v-textarea
        label="¿Por qué querés adoptar?"
        v-model="motivo"
        required
      />

      <v-btn type="submit" color="primary">Enviar solicitud</v-btn>
    </form>
  </div>
</template>

<style scoped>
.requisitos-container {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}

.requisitos-lista {
  padding-left: 1.5rem;
  margin-bottom: 2rem;
}

.mascota-info {
  text-align: center;
  margin-bottom: 2rem;
}

.usuario-logueado {
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #333;
}

.formulario-adopcion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
