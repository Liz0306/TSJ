<template>
  <div class="layout">
    <nav class="sidebar">
      <ul class="menu-vertical">
        <li><router-link to="/" aria-current="page">Inicio</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/communityTSJZ/login" aria-current="page">Inicia Sesión</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/communityTSJZ/register" aria-current="page">Registrate</router-link></li>
        <li><router-link to="/communityTSJZ/sobre">Sobre nosotros</router-link></li>
        <li><router-link to="/communityTSJZ/Raite">Raite</router-link></li>
        <li><a href="">Compra y venta</a></li>
        <li  v-if="isAuthenticated">
          <router-link to="/profile">Mi Perfil</router-link>
          <ul class="submenu">
            <li><router-link to="/communityTSJZ">Mi Perfil</router-link></li>
            <li><a href="">Configuración</a></li>
            <li @click="logout"><router-link to="/communityTSJZ">Cerrar sesión</router-link></li>
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
</template>

<script>
import  EventBus from '../eventBus';
export default {
  data() {
    return {
       isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  name: 'TSJ_Community',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    },
    handleUserLoggedIn() {
    this.isAuthenticated = true; 

  }
  },
  mounted(){
    EventBus.on('userLoggedIn',this.handleUserLoggedIn);
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



/* Estilo general para la sección "Sobre Nosotros" */
.about-us {
    background-color: rgba(113, 83, 221, 0.671);
    color: #fff;
    padding: 50px 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    margin-top: 3%;
    border-radius: 10px;
}

/* Contenido centrado */
.about-content {
    max-width: 800px;
    animation: fadeInUp 1.5s ease-in-out;
}

/* Título y párrafos */
.about-content h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.about-content p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 10px;
}

/* Animación de entrada */
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Estilo general para la sección "Nuestro Objetivo" */
.our-goal {
    padding: 80px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

/* Contenido centrado */
.goal-content {
    max-width: 700px;
    color: #333;
    animation: fadeIn 1.5s ease-in-out;
}

/* Título y párrafo */
.goal-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #222;
}

.goal-content p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
}

/* Animación de aparición */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.our-goal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
}

.goal-content {
    flex: 1;
    max-width: 60%;
}

.goal-image {
    flex: 1;
    max-width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
}

.goal-image img {
    width: 100%;
    height: auto;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease-in-out forwards;
    border-radius: 10%;
}

/* Animación */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}



</style>
