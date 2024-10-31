import { reactive } from 'vue'; // Importa reactive de Vue

// Crear un bus de eventos reactivo
const EventBus = {
  // Aquí almacenaremos nuestros eventos
  events: reactive({}),
  
  // Método para emitir eventos
  emit(event, data) {
    this.events[event] = data;
  },
  
  // Método para escuchar eventos
  on(event, callback) {
    this.events[event] = callback;
  },
  
  // Método para limpiar el evento
  off(event) {
    delete this.events[event];
  }
};

export default EventBus;

