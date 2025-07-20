import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import { useAuthStore } from './stores/auth';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


import './assets/main.css';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const auth = useAuthStore();
auth.cargarUsuarioActual();

app.use(vuetify);
app.use(router);

app.mount('#app');