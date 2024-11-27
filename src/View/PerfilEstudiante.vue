<template>
    <div class="user-profile">
      <h2>Perfil de Usuario</h2>
      <div class="user-info">
        <p><strong>Nombre:</strong> {{ userData.nombre }}</p>
      <p><strong>Apellido:</strong> {{ userData.apellido }}</p>
      <p><strong>Email:</strong> {{ userData.email }}</p>
      <p><strong>Teléfono:</strong> {{ userData.telefono }}</p>
      </div>
      <div class="user-cars">
        <h3>Mis Carros</h3>
        <ul>
           <li v-for="(car, index) in userData.cars" :key="index">
            {{ car }}
          </li> 
        </ul>
         <button @click="addCar">Agregar Carro</button> 
      </div>
    </div>
  </template>

  <script>

  export default {
    name:"PerfilEstudiante",
    data() {
      return {
        userData: {},
        carros: []
      };
    },
    mounted(){
        this.getPerfil();
       
    },
    methods: {
      addCar() {
        const newCaromodelo = prompt("Ingrese el modelo del  carro:");
      
        if (newCaromodelo) {
          this.user.cars.push(newCaromodelo);
        }
      },
      getPerfil() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token no encontrado, por favor inicia sesión.');
        return; 
    }
    fetch('http://localhost:3000/user/auth/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
       

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Token expirado o no válido');
            }
            throw new Error('Error en la respuesta de red');
        }
        return response.json();
    })
    .then(data => {
    if (Array.isArray(data) && data.length > 0) {
        this.userData = data[0]; 
    } else {
        console.error('Los datos del usuario están vacíos o en un formato inesperado.');
    }
 
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error.message);
        if (error.message === 'Token expirado o no válido') {
            console.error('Redirigiendo al inicio de sesión...');
        }
    });
}
,

    }
  };
  </script>
  
  <style scoped>
  .user-profile {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .user-info {
    margin-bottom: 15px;
  }
  
  .user-cars ul {
    list-style-type: none;
    padding: 0;
  }
  
  .user-cars li {
    margin: 5px 0;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>