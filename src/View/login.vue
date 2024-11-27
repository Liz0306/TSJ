<template>
  <div class="login-page">
    <div class="login-container">
      <div class="image-section">
        <img src="../assets/login.png" alt="Login Image" />
      </div>
      <div class="form-section">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn">Iniciar Sesión</button>
        </form>
        <p>¿No tienes una cuenta? <router-link to="/communityTSJZ/register">Regístrate aquí</router-link></p>
      </div>
    </div>
  </div>
 
</template>

<script>
import EventBus from '../eventBus';

export default {
  name: 'StudentLogin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    async login() {
      const dataUser = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await fetch('http://localhost:3000/user/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUser)
        });
        if (!response.ok) {
          throw new Error('Algo salió mal');
        }
        const responseData = await response.json();

        localStorage.setItem('token', responseData.token);
        
        alert('Inicio exitoso');
        EventBus.emit('userLoggedIn');
  
        this.$router.push('/communityTSJZ');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
};
</script>
  
  <style scoped>
  .login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
  }
  
  .login-container {
    display: flex;
    max-width: 900px;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .image-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  
  .image-section img {
    max-width: 100%;
    height: auto;
  }
  
  .form-section {
    flex: 1;
    padding: 40px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  
  p {
    text-align: center;
  }
  
  /* Estilos responsivos */
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }
  
    .image-section {
      display: none;
    }
  
    .form-section {
      padding: 20px;
    }
  }
  </style>
  