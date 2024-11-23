<template>
  <div class="post-list">
    <h2>Publicaciones</h2>
    <div v-for="(post, index) in posts" :key="index" class="post">
      <h3>{{ post.content }}</h3>
      <p>Salida: {{ post.salida }}</p>
      <p>Destino: {{ post.punto_destino }}</p>
      <p>Hora de Salida: {{ post.hora_salida }}</p>
      <p>Cupo: {{ post.cupo_disponible }}</p>
      <div v-if="post.imageSrc">
        <img :src="post.imageSrc" alt="Vista previa de la imagen" class="post-image">
      </div>
      <div :style="{ backgroundColor: post.color }" class="color-box"></div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/eventBus.js';

export default {
  name: 'PostList',
  data() {
    return {
      posts: []
    };
  },
  created() {
    EventBus.on('new-post', this.addPost);
  },
  methods: {
    addPost(post) {
      if (post) {
        this.posts.push(post);
      
      }

    }
  },
  beforeUnmount() {
    EventBus.off('new-post', this.addPost);
  }
};
</script>

<style scoped>
/* Estilos de PostList */
.post-list {
  padding: 20px;
}

.post {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.post-image {
  width: 100px;
  height: auto;
}

.color-box {
  width: 100px;
  height: 20px;
  margin-top: 10px;
}
</style>