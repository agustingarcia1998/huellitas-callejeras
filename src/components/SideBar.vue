<script setup>
import { menuItems } from "../../utils/sideBarItems";
</script>

<template >
  <v-navigation-drawer :width="200" permanent>
    <v-list>
      <div class="logo-app">
        <v-list-item-title class="item-title"
          >Huellitas Callejeras</v-list-item-title
        >
      </div>
      <div v-for="(menu, index) in menuItems" :key="index" class="">
        <v-list-subheader>{{ menu.section }}</v-list-subheader>
        <v-list-item
          v-for="(item, i) in menu.menuItems"
          :key="i"
          link
          :value="item.text"
          rounded="shaped"
          :to="item.link"
          :class="item.text"
        >
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
