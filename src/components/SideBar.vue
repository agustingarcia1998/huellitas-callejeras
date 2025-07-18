<script setup>
import { menuItems } from "../../utils/sideBarItems";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute(); 

// Función para navegar al hacer click en item
function navigateTo(link) {
  if (link && link !== "#") {
    router.push(link);
  }
}
</script>

<template>
  <v-navigation-drawer :width="200" permanent app>
    <v-list dense nav>
      <div
        class="logo-app"
        style="padding: 1rem; font-weight: bold; font-size: 1.2rem"
      >
        Huellitas Callejeras
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
          <v-list-item-icon>
            <v-icon>{{ item.icon || "mdi-paw" }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.logo-app {
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1.5rem 1rem;
  color: #1976d2; 
  border-bottom: 1px solid #e0e0e0;
  user-select: none;
}

.v-list-subheader {
  font-weight: 600;
  font-size: 1.1rem;
  color: #555;
  padding-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.v-list-item {
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: #e3f2fd; 
  cursor: pointer;
}

.active-item {
  background-color: #bbdefb !important; 
  font-weight: 700;
  color: #0d47a1 !important; 
}

.v-list-item-title {
  user-select: none;
  font-size: 1rem;
  color: inherit;
}
</style>
