import { defineStore } from "pinia";
import axios from "axios";

export const usePetsStore = defineStore("pets", {
  state: () => ({
    pets: [],
    baseUrl: "http://localhost:3030/api/pets",
  }),

  actions: {
    async fetchPets() {
      try {
        const response = await axios.get(this.baseUrl);
        this.pets = response.data;
        console.log("Respuesta cruda del backend:", response.data);
      } catch (error) {
        console.log("error al traer mascotas", error);
      }
    },

    async addPet(formData) {
      try {
        const response = await axios.post(this.baseUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.pets.push(response.data);
      } catch (error) {
        console.error("Error al crear mascota:", error.response?.data || error);
      }
    },

    async deletePet(id) {
      try {
        await axios.delete(`${this.baseUrl}/${id}`);
        this.pets = this.pets.filter((p) => p._id !== id);
      } catch (error) {
        console.error("Error al eliminar mascota:", error);
      }
    },

    async updatePet(id, formData) {
      try {
        const response = await axios.put(`${this.baseUrl}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const index = this.pets.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.pets[index] = response.data;
        }
      } catch (error) {
        console.error("Error al actualizar mascota:", error);
      }
    },
  },
});
