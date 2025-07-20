import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuarioActual: null,
    usuarios: JSON.parse(localStorage.getItem("usuariosHuellitas")) || [],
  }),
  actions: {
    login(email, password) {
      const usuario = this.usuarios.find(
        (u) => u.email === email && u.password === password
      );
      if (usuario) {
        this.usuarioActual = usuario;
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        return true;
      }
      return false;
    },
    logout() {
      this.usuarioActual = null;
      localStorage.removeItem("usuarioActual");
    },
    register(nombre, email, password) {
      const existe = this.usuarios.find((u) => u.email === email);
      if (existe) {
        return false;
      }
      const nuevoUsuario = {
        nombre,
        email,
        password,
        rol: email === "admin@huellitas.com" ? "admin" : "usuario",
      };
      this.usuarios.push(nuevoUsuario);
      localStorage.setItem("usuariosHuellitas", JSON.stringify(this.usuarios));
      return this.login(email, password);
    },
    cargarUsuarioActual() {
      const data = localStorage.getItem("usuarioActual");
      if (data) {
        this.usuarioActual = JSON.parse(data);
      }
    },
  },
});
