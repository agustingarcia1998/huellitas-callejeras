import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'



const routes = [
  { path: '/', component: HomeView },
//   { path: '/admin', component: AdminView },
//   { path: '/login', component: LoginView },
//   { path: '/register', component: RegisterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router