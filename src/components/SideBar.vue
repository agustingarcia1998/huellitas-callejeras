<script setup>
import { getMenuItems } from "../../utils/sideBarItems";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth"; 

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const menuItems = computed(() => getMenuItems(auth.usuarioActual));

function navigateTo(link) {
  if (link && link !== "#") {
    router.push(link);
  }
}

function logout() {
  auth.logout();
  router.push("/");
}
</script>

<template>
  <v-navigation-drawer class="sidebar" :width="200" permanent app>
    <v-list nav>
      <div
        class="title-sideBar"
        style="padding: 1rem; font-weight: bold; font-size: 1.2rem"
      >
        Huellitas Callejeras
      </div>

      <div v-if="auth.usuarioActual" class="user-info" style="padding: 1rem;">
        <div><strong>Hola, {{ auth.usuarioActual.nombre }}</strong></div>
        <v-btn small text color="red" @click="logout">Cerrar sesión</v-btn>
      </div>

      <div v-else class="login-register" style="padding: 1rem;">
        <v-btn small text @click="navigateTo('/login')">Iniciar sesión</v-btn>
        <v-btn small text @click="navigateTo('/register')">Registrarse</v-btn>
      </div>

      <div v-for="(menu, index) in menuItems" :key="index" class="mb-4">
        <v-list-subheader>{{ menu.section }}</v-list-subheader>

        <v-list-item
          v-for="(item, i) in menu.listItems"
          :class="{ 'active-item': route.path === item.link }"
          :key="i"
          link
          @click="navigateTo(item.link)"
          rounded
          style="cursor: pointer"
        >
          <template #prepend>
            <v-icon>{{ item.icon || "mdi-paw" }}</v-icon>
          </template>

          <template #title>
            {{ item.text }}
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.sidebar {
  max-width: 288px;
  height: 100%;
  background-color: #f5b074;
}

.title-sideBar {
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1.5rem 1rem;
  color: #000000;
  border-bottom: 1px solid #e0e0e0;
  user-select: none;
}

.v-list-subheader {
  color: #000000;
  padding-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.v-list-item {
  transition: background-color 0.5s ease;
}

.v-list-item:hover {
  background-color: #00000056;
  color: white;
  cursor: pointer;
}
</style>
