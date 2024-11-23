<template>
  <div class="posts">
    <h2>Publicaciones</h2>
    <ul class="post-list">
      <li v-for="(post, index) in newPosts" :key="index" class="post-item">
  <p class="post-content">{{ post.postContent }}</p>
  <router-link to="/communityTSJZ">
    <p>{{ post.nombre_usuario }} {{ post.apellido_usuario }}</p>
  </router-link>
  <p><strong>Punto de salida:</strong> {{ post.punto_salida }} </p>
  <p><strong>Punto de destino:</strong> {{ post.punto_destino }}</p>
  <p><strong>Hora de salida:</strong> {{ post.hora_salida }}</p>
  <p><strong>Cupo disponible:</strong> {{ post.cupo_disponible }}</p>
  <p><strong>Tarifa:</strong> {{ post.tarifa }}</p>

  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: `${(post.joinedUsers / post.totalCupo) * 100}%` }"></div>
  </div>

        <div v-if="post.isUserJoined && parseInt(post.id_usuario) !== parseInt(userId)" class="button-container">
        <button @click="leaveTravel(post.id_viaje, index)" class="leave-button" >Abandonar viaje</button>
       </div>
       <div v-else class="button-container">
        <button v-if="post.cupo_disponible > 0 && parseInt(post.id_usuario) !== parseInt(userId)" @click="joinTravel(index)" class="join-button">
          Unirse al viaje
        </button>
        <p v-else-if="parseInt(post.id_usuario) === parseInt(userId)">:D</p>
        <p v-else class="full-message">Cupo lleno</p>
      </div>

  <div v-if="parseInt(post.id_usuario) === parseInt(userId)" class="button-container">
    <button @click="editPost(post.id_viaje)" class="edit-button">Editar</button>
    <button @click="deletePost(post.id_viaje)" class="delete-button">Eliminar</button>
  </div>
</li>
    </ul>
  </div>
  <router-link to="/communityTSJZ/post" class="floating-button">+</router-link>
  <router-link to="/communityTSJZ/statusViaje" class="fixed-status-button" >Status de tus viajes</router-link>
</template>


<script>
import EventBus from '@/eventBus.js';
import socket from '../plugins/socket.js'
export default {
  name: 'PostView',
  data() {
    return {
      userId: localStorage.getItem('userId'),
      newPosts: [],
      joinedUsers: 0,
      joinedUserIds: []
    };
  },
  
mounted() {
  this.getTravels();
  socket.on('pasajero-agregado', this.handlePassengerAdded);
  socket.on('pasajero-eliminado', this.handlePassengerRemoved);
  EventBus.on('new-post', this.addNewPost);
  
},
beforeMount(){
  EventBus.off('new-post',this.addNewPost);
},
methods: {
  async quitPasajero(id_viaje, index) {
  try {
    const response = await fetch('http://localhost:3000/api/viajeEliminarPasajeros', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ id_viaje })
    });

    if (!response.ok) {
      throw new Error('Error al eliminar al pasajero del viaje');
    }

    const result = await response.json();
    alert(result.message); // Mostrar mensaje de éxito al usuario

    // Actualizar el estado local
    const post = this.newPosts[index];
    post.joinedUsers--; // Disminuir el número de usuarios unidos
    post.cupo_disponible++; // Incrementar el cupo disponible
    post.isUserJoined = false; // Marcar que el usuario ya no está unido
  } catch (e) {
    console.error('Error al eliminar pasajero del viaje:', e);
    alert('Hubo un error al intentar eliminar al pasajero del viaje.');
  }
}
,
async deletePost(id_viaje){
  try{
    const response = fetch('http://localhost:3000/api/viajeEliminar',{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ id_viaje: id_viaje})
    })
    if (!response.ok) {
       throw new Error('Error al eliminar el viaje');
       }
       alert('Eliminando viaje');
       this.newPosts = this.newPosts.filter(post => post.id_viaje !== id_viaje);
  }catch(e){
    console.error('Error al solicitar unirse al viaje:', e);
  }
},
  async joinTravel(index) {
    const post = this.newPosts[index];
      //Evaluacion para ver si esta
    try{
        const response = await fetch('http://localhost:3000/api/viajePreconfirmacion',{
          method: 'POST',
          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id_viaje: post.id_viaje, estatus: 'confirmado' })
        }) 
        if (!response.ok) {
          console.log("Erro")
       }
       alert('Solicitud enviada. Espera la confirmación del conductor.');
       post.isUserJoined = true;
       post.cupo_disponible--;
    }catch(e){
      console.error('Error al solicitar unirse al viaje:', e);
    }
  },async leaveTravel(id_viaje, index) {
  try {
    await this.quitPasajero(id_viaje, index);
  } catch (e) {
    console.error('Error al abandonar el viaje:', e);
  }
},
  async isUserJoined(post) {
  try {
    const response = await fetch('http://localhost:3000/api/viajePasajeroExiste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ id_viaje: post.id_viaje })
    });

    if (!response.ok) {
      console.error('Error en la solicitud:', response.statusText);
      return false;
    }
    const data = await response.json();
    return data.message === 'Pasajero si existe';
  } catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
    return false;
  }
}
,

    addNewPost(post) {
      this.newPosts.push(post);
    },
    async getTravels() {
  try {
    const response = await fetch('http://localhost:3000/api/viaje', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

   
    this.newPosts = await Promise.all(
      data.map(async (post) => {
        const userJoined = await this.isUserJoined(post); 
        return { ...post, isUserJoined: userJoined };
      })
    );
  } catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
  }
}

  }
};

</script>

<style scoped>
.posts {
  padding: 20px;
  background-color: #f3e5f5; /* Morado muy claro */
}

h2 {
  color: #4a148c; /* Morado oscuro */
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.post-list {
  list-style-type: none;
  padding: 0;
}

.post-item {
  background: linear-gradient(to right, #7e57c2, #9575cd);
  color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.post-item:hover {
  transform: translateY(-5px);
}

.post-content {
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.edit-button, .delete-button, .join-button {
  padding: 10px 16px;
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #7b1fa2; 
}

.edit-button:hover {
  background-color: #4a148c;
}

.delete-button {
  background-color: #d32f2f;
}

.delete-button:hover {
  background-color: #b71c1c;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #512da8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  text-decoration: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.floating-button:hover {
  background-color: #311b92;
}


.join-button {
  padding: 8px 12px;
  font-size: 0.9em;
  color: white;
  background-color: #6a1b9a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.join-button:hover {
  background-color: #4a148c;
}

.full-message {
  color: #d32f2f;
  font-weight: bold;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: #d1c4e9; /* Morado claro */
  border-radius: 6px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #5e35b1, #8e24aa);
  transition: width 0.3s ease;
  border-radius: 6px;
}
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
</style>