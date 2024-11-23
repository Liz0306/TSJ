<template>
  <div>
    <h2>Solicitudes de Pasajeros</h2>
    <ul>
      <li v-for="viaje in pendingPassengers" :key="viaje.id_viaje">
        <h3>Viaje: {{ viaje.punto_salida }} a {{ viaje.punto_destino }}</h3>
        <p>Hora de salida: {{ viaje.hora_salida }}</p>
        <p>Carro: {{ viaje.modelo_carro }} - {{ viaje.color_carro }} ({{ viaje.año_carro }})</p>
        <p>Comentario: {{ viaje.comentario }}</p>
        <p>Tarifa: ${{ viaje.tarifa }}</p>
        <p>Cupo disponible: {{ viaje.cupo_disponible }}</p>
        <h4>Pasajeros</h4>
        <ul>
          <li v-for="pasajero in viaje.pasajeros" :key="pasajero.id_pasajero">
            <p>{{ pasajero.nombre }} {{ pasajero.apellido || '' }} - Estatus: {{ pasajero.estatus }}</p>
            <button class="accept-button"  @click="acceptPassenger(viaje.id_viaje)">Aceptar</button>
            <button class="reject-button" @click="rejectPassenger(viaje.id_viaje,pasajero.id_pasajero)">Rechazar</button>
            
          </li>
          <router-link to="/communityTSJZ/viajeIniciado" >Iniciar Viaje</router-link>
         
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Administracion_Viajes',
  data() {
    return {
      pendingPassengers: [] // Ahora es un array de viajes, cada viaje contiene un array de pasajeros
    };
  },
  mounted() {
    this.fetchPendingPassengers();
  },
  methods: {
    async fetchPendingPassengers() {
      try {
        const response = await fetch(`http://localhost:3000/api/viajeStatusPasajeros`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          throw new Error('Error al solicitar unirse al viaje');
        }
        const data = await response.json();
        this.pendingPassengers = data; // Guardar la respuesta completa en `pendingPassengers`
      } catch (error) {
        console.error('Error al obtener pasajeros pendientes:', error);
      }
    },
    async acceptPassenger(id_pasajero) {
      // Código para aceptar al pasajero
      console.log(`Pasajero con ID ${id_pasajero} aceptado`);
      // Aquí puedes hacer una petición para cambiar el estado a "confirmado"
    },
    async rejectPassenger(id_viaje, id_pasajero) {
  try {
    const response = await fetch('http://localhost:3000/api/viajeEliminarPasajeros', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ id_viaje, id_pasajero })
    });

    if (!response.ok) {
      throw new Error('Error al eliminar al pasajero del viaje');
    }

    const result = await response.json();
    alert(result.message);

    // Actualizar la lista localmente eliminando el pasajero del array
    const viaje = this.pendingPassengers.find(v => v.id_viaje === id_viaje);
    if (viaje) {
      viaje.pasajeros = viaje.pasajeros.filter(p => p.id_pasajero !== id_pasajero);
    }
  } catch (error) {
    console.error('Error al eliminar pasajero del viaje:', error);
    alert('Hubo un error al intentar eliminar al pasajero del viaje.');
  }
}
  }
};
</script>


  <style>
    .fixed-status-button {
  position: fixed;
  bottom: 100px; /* Ajusta esta distancia según lo necesites */
  right: 20px; /* Ajusta esta distancia según lo necesites */
  background-color: #512da8; /* Color de fondo */
  color: #fff; /* Color del texto */
  padding: 10px 20px; /* Tamaño del botón */
  border-radius: 8px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño del texto */
  font-weight: bold; /* Peso del texto */
  text-align: center;
  text-decoration: none; /* Sin subrayado */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Sombra */
  transition: background-color 0.3s ease; /* Transición para el hover */
  z-index: 1000; /* Para que quede sobre otros elementos */
}

.fixed-status-button:hover {
  background-color: #311b92; /* Color al pasar el cursor */
}
.accept-button{
  background-color: green;
}
.reject-button{
  background-color: red;
}
</style>
  

