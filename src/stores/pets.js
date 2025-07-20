import { defineStore } from 'pinia'
import { initialPets } from '../../utils/initialPets' 

export const usePetsStore = defineStore('pets', {
  state: () => ({
    pets: []
  }),

  actions: {
    loadPets() {
      const savedPets = localStorage.getItem('pets')
      if (savedPets) {
        this.pets = JSON.parse(savedPets)
      } else {
        this.pets = initialPets
        this.savePets()
      }
    },

    savePets() {
      localStorage.setItem('pets', JSON.stringify(this.pets))
    },

    addPet(newPet) {
      // Asignar un id único (simplemente max id + 1)
      const maxId = this.pets.reduce((max, pet) => (pet.id > max ? pet.id : max), 0)
      newPet.id = maxId + 1
      this.pets.push(newPet)
      this.savePets()
    },

    updatePet(updatedPet) {
      const index = this.pets.findIndex(p => p.id === updatedPet.id)
      if (index !== -1) {
        this.pets[index] = updatedPet
        this.savePets()
      }
    },

    removePet(id) {
      this.pets = this.pets.filter(p => p.id !== id)
      this.savePets()
    }
  }
})
