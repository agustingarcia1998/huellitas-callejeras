import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HomeView from "@/views/HomeView.vue";
import RequirementsView from "@/views/RequirementsView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddPetView from "@/views/admin/AddPetView.vue";
import RemovePetView from "@/views/admin/RemovePetView.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/admin",
    component: AdminView,
    meta: { requiresAdmin: true },
    children: [
      { path: "add", component: AddPetView },
      { path: "remove", component: RemovePetView },
    ],
  },
  { path: "/require", component: RequirementsView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  auth.loadCurrentUser();

  if (to.meta.requiresAuth && !auth.currentUser) {
    alert("Debés iniciar sesión para acceder a esta página");
    return next("/login");
  }

  if (to.meta.requiresAdmin && auth.currentUser?.role !== "admin") {
    alert("No tenés permisos para acceder a esta sección");
    return next("/");
  }

  next();
});

export default router;
