import { defineStore } from 'pinia'

export const useAdopcionesStore = defineStore('adopciones', {
  state: () => ({
    solicitudes: []
  }),
  actions: {
    agregarSolicitud(solicitud) {
      this.solicitudes.push(solicitud)
      this.guardarEnLocalStorage()
    },
    cargarDesdeLocalStorage() {
      const datos = localStorage.getItem('solicitudesAdopcion')
      if (datos) {
        this.solicitudes = JSON.parse(datos)
      }
    },
    guardarEnLocalStorage() {
      localStorage.setItem('solicitudesAdopcion', JSON.stringify(this.solicitudes))
    }
  }
})