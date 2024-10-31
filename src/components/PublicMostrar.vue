<template>
    <div id="postsContainer">
      <div v-for="(post, index) in posts" :key="index" class="post" :style="{ backgroundColor: post.color }">
        <p><strong>Salida:</strong> {{ post.salida }}</p>
        <p><strong>Destino:</strong> {{ post.destino }}</p>
        <p><strong>Hora de Salida:</strong> {{ post.horaSalida }}</p>
        <p><strong>Cantidad de Cupo:</strong> {{ post.cupo }}</p>
        <p class="post-content">{{ post.content }}</p>
        <img v-if="post.imageSrc" :src="post.imageSrc" alt="Imagen de la publicación" class="post-image">
      </div>
    </div>
  </template>
  
  <script>
  import EventBus from '@/eventBus.js'; 
  
  export default {
    name: 'PostMost',
    data() {
    return {
      posts: []
    };
  },
  created() {
    EventBus.on('new-post', this.addPost); // Escucha el evento 'new-post' y llama a addPost
  },
  beforeUnmount() {
    EventBus.off('new-post', this.addPost); // Limpia el listener cuando el componente se destruye
  },
  methods: {
    addPost(newPost) {
      console.log('Nuevo post recibido:', newPost); // Para depuración
      this.posts.push(newPost); // Agrega la nueva publicación al array
    }
  }
};
  </script>
  
  <style scoped>
  /* Estilos de las publicaciones */
.post {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.post p {
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 1.6;
  color: #333;
}

.post-content {
  margin-bottom: 10px;
  white-space: pre-line;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}

#postsContainer {
  margin-top: 40px;
  background-color: aqua;
}

#imagePreview {
  margin-bottom: 20px;
}

#imagePreview img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.hidden {
  display: none;
}
  </style>
  