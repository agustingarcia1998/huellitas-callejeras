import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import RequisitosView from '@/views/RequisitosView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import AgregarMascotaView from '@/views/admin/AgregarMascotaView.vue'
import MascotasAdoptadasView from '@/views/admin/MascotasAdoptadasView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/admin', component: AdminView },
  { path: '/admin/agregar', component: AgregarMascotaView },
  { path: '/admin/adoptadas', component: MascotasAdoptadasView },
  { path: '/requisitos', component: RequisitosView},
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  auth.cargarUsuarioActual()

  if (to.meta.requiresAuth && !auth.usuarioActual) {
    alert('Debés iniciar sesión para acceder a esta página')
    return next('/login')
  }

  if (to.meta.requiresAdmin && auth.usuarioActual?.rol !== 'admin') {
    alert('No tenés permisos para acceder a esta sección')
    return next('/')
  }

  next()
})

export default router