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
        <p><strong>Punto de punto_destino:</strong> {{ post.punto_destino }}</p>
        <p><strong>Hora de salida:</strong> {{ post.hora_salida }}</p>
        <p><strong>Cupo disponible:</strong> {{ post.cupo_disponible }}</p>
        <p><strong>$Tarifa</strong> {{ post.tarifa }}</p>

        <!--barra de progreso-->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${(post.joinedUsers / post.totalCupo) * 100}%` }"></div>
        </div>


        <!---boton de unirse---->
          <button v-if="post.cupo_disponible > 0" @click="joinTravel(index)" class="join-button">
            Unirse al viaje
          </button>
        <p v-else class="full-message">Cupo lleno</p>
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
          totalCupo:2,
          joinedUsers: 0,  //ayuda a actualizad el porsentaje d totalcupo
        },
        {
          color: "#fffff",
          postContent: 'Contenido de la publicación 1',
          salida: '123',
          punto_destino: 'Guatemala',
          hora_salida: '',
          cupo_disponible: 2,
          totalCupo:2,
          joinedUsers: 0,
        }
      ],

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
   //metodos d boton unirse
    joinTravel(index) {
      const post = this.newPosts[index];
  if (post.cupo_disponible > 0) {
    post.joinedUsers++; // Incrementar usuarios que se han unido
    post.cupo_disponible--; // Reducir el cupo disponible
  } else {
    alert('El viaje ya está lleno.');
  }
   },

    addNewPost(post) {
      // console.log("Datos recibidos por el componente:", post);
      this.newPosts.push(post);
      // console.log('Estado actualizado de newPosts:', this.newPosts);
    },
    getTravels(){
      fetch('http://localhost:3000/api/viaje',{
        method:'GET',
        headers:{  
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); 
        })
        .then(data => {
          this.newPosts = data; 
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
  background-color: #f3e5f5; /* Morado muy claro */
  overflow: hidden;
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
  transition: transform 1s ease;
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


</style>
