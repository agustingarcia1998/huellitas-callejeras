import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
    users: JSON.parse(localStorage.getItem("huellitasUsers")) || [],
    adminEmails: ["garzaniel1@gmail.com", "garzaniel2@gmail.com"], // Lista de admins
  }),
  actions: {
    login(email, password) {
      const user = this.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        this.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      }
      return false;
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    register(name, email, password) {
      const exists = this.users.find((u) => u.email === email);
      if (exists) {
        return false;
      }
      const newUser = {
        name,
        email,
        password,
        role: this.adminEmails.includes(email) ? "admin" : "user", // asigna rol admin si está en la lista
      };
      this.users.push(newUser);
      localStorage.setItem("huellitasUsers", JSON.stringify(this.users));
      return this.login(email, password);
    },
    loadCurrentUser() {
      const data = localStorage.getItem("currentUser");
      if (data) {
        this.currentUser = JSON.parse(data);
      }
    },
  },
});
