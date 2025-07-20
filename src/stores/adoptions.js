import { defineStore } from 'pinia'

export const useAdoptionsStore = defineStore('adoptions', {
  state: () => ({
    applications: []
  }),
  actions: {
    addApplication(application) {
      this.applications.push(application)
      this.saveToLocalStorage()
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('adoptionApplications')
      if (data) {
        this.applications = JSON.parse(data)
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('adoptionApplications', JSON.stringify(this.applications))
    }
  }
})