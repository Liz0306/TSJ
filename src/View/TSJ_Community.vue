<template>
  <div class="layout">
    <nav class="sidebar">
      <ul class="menu-vertical">
        <li><router-link to="/" aria-current="page">Inicio</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/communityTSJZ/login" aria-current="page">Inicia Sesión</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/communityTSJZ/register" aria-current="page">Registrate</router-link></li>
        <li><a href="">Sobre nosotros</a></li>
        <li><router-link to="/Raite">Raite</router-link></li>
        <li><a href="">Compra y venta</a></li>
        <li>
          <a href="">Perfil</a>
          <ul class="submenu">
            <li><router-link to="/profile">Mi Perfil</router-link></li>
            <li><a href="">Configuración</a></li>
            <li @click="logout"><router-link to="/profile">Cerrar sesión</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>
    
    <main class="content">
      <header class="top-bar">
        <h1>Bienvenido a TSJ Community</h1>
      </header>
      <router-view></router-view>
    </main>
  </div>
  <PostCreate></PostCreate>
</template>

<script>

import PostCreate from '@/components/publicacion.vue'
export default {
  components: {
    PostCreate
  },
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'), // Inicializa el estado
    };
  },
  name: 'TSJ_Community',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/communityTSJZ/login');
    }
  }
}
</script>

<style scoped>
/* Layout general */
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

/* Estilos de la barra lateral (sidebar) */
.sidebar {
  width: 250px;
  background-color: #37109F;
  padding-top: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
}

.menu-vertical {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-vertical > li > a {
  display: block;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
}

.menu-vertical > li:hover {
  background-color: #37109F;
}

.submenu {
  list-style: none;
  display: none;
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-vertical li:hover .submenu {
  display: block;
}

.submenu li a {
  padding-left: 40px;
}

.submenu li:hover {
  background-color: #1ABC9C;
}

/* Estilos para la sección principal */
.content {
  flex-grow: 1;
  margin-left: 250px; /* Alineado con la sidebar */
  padding: 20px;
  background-color: #ECF0F1;
}

.top-bar {
  
  background-color: #37109F;
  color: white;
  padding: 15px;
  text-align: center;
}

/* Responsivo para pantallas pequeñas */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
  }

  .content {
    margin-left: 0;
  }
}
</style>
