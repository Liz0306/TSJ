<template>
  <h1>//agregar logo</h1>
  <div class="posts">
    <h2>Publicaciones</h2>
    <ul class="post-list">
      <li v-for="(post, index) in newPosts" :key="index" class="post-item">
        <p class="post-content">{{ post.postContent }}</p>
        <router-link to="/communityTSJZ">
          <p>{{ post.nombre_usuario}}{{post.apellido_usuario }}</p>
        </router-link>
        <p><strong>Punto de salida:</strong> {{ post.punto_salida }}</p>
        <p><strong>Punto de punto_destino:</strong> {{ post.punto_punto_destino }}</p>
        <p><strong>Hora de salida:</strong> {{ post.hora_salida }}</p>
        <p><strong>Cupo disponible:</strong> {{ post.cupo_disponible_disponible }}</p>
        <p><strong>$Tarifa</strong> {{ post.tarifa }}</p>
        <div class="button-container">
          <button @click="editPost(index)" class="edit-button">Editar</button>
          <button @click="deletePost(index)" class="delete-button">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
  <router-link to="/communityTSJZ/post" class="floating-button">+</router-link>
</template>


<script>
import EventBus from '@/eventBus.js';

export default {
  name: 'PostView',
  data() {
    return {
      newPosts: [
        {
          color: "#fffff",
          postContent: 'Contenido de la publicación 1',
          salida: '123',
          punto_destino: 'Guatemala',
          hora_salida: '',
          cupo_disponible: 2,
        },
        {
          color: "#fffff",
          postContent: 'Contenido de la publicación 1',
          salida: '123',
          punto_destino: 'Guatemala',
          hora_salida: '',
          cupo_disponible: 2,
        }
      ],
      a: {
        color: "#fffff",
        postContent: 'Contenido de la publicación 2',
        salida: '456',
        punto_destino: 'México',
        hora_salida: '10:00 AM',
        cupo_disponible: 3,
      }
    };
  },
  
mounted() {
  this.getTravels();
  EventBus.on('new-post', this.addNewPost);

},
beforeMount(){
  EventBus.off('new-post',this.addNewPost);
  
},
methods: {
    addNewPost(post) {
      console.log("Datos recibidos por el componente:", post);
      this.newPosts.push(post);
      console.log('Estado actualizado de newPosts:', this.newPosts);
    },
    getTravels(){
      fetch('http://localhost:3000/api/viaje',{
        headers:{  
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Convierte la respuesta en JSON
        })
        .then(data => {
          this.newPosts = data; // Actualiza newPosts con los datos obtenidos
          console.log('Posts obtenidos:', this.newPosts);
        })
        .catch(error => {
          console.error('Hubo un problema con la solicitud fetch:', error);
        });
    }
  }
};

</script>

<style scoped>
.posts {
  padding: 20px;
}

h2 {
  color: #333;
  text-align: center;
  font-size: 1.8em;
  margin-bottom: 20px;
}

.post-list {
  list-style-type: none;
  padding: 0;
}

.post-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-content {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 8px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.edit-button, .delete-button {
  padding: 8px 12px;
  font-size: 0.9em;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #4CAF50;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #e53935;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.floating-button:hover {
  background-color: #0056b3;
}
</style>
