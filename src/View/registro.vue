<template>
  <div class="register-page">
    <div class="register-container">
      <div class="form-section">
        <h2>Registrarse</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input type="text" id="apellido" v-model="apellido" required />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <div class="email-input">
              <input
                type="text"
                id="email-start"
                v-model="emailStart"
                placeholder=""
                maxlength="11"
                required
              />
              <span>@zapopan.tecmm.edu.mx</span>
            </div>
            <small v-if="emailError" class="error">{{ emailError }}</small>
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input type="text" id="phone" v-model="phone" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group">
            <label for="confirmpassword">Confirmar contraseña</label>
            <input type="password" id="confirmpassword" v-model="confirmpassword" required />
          </div>
          <button type="submit" class="btn">Registrarse</button>
        </form>
        <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
      </div>
      <div class="image-section">
        <img src="../assets/login.png" alt="Register Image" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RegistroUsuario',
  data() {
    return {
      name: '',
      apellido: '',
      emailStart: '', //parte que se puede editar
      emailError:'', //mensaje de error
      phone: '',
      password: '',
      confirmpassword:''
    };
  },
  methods: {
    validateEmail() {
      const email = `${this.emailStart}@zapopan.tecmm.edu.mx`;
      const emailRegex = /^za\d{9}@zapopan\.tecmm\.edu\.mx$/; //utiliza una exprecion regular para verificar si esta bien 

      if (!emailRegex.test(email)) {
        this.emailError = 'El correo debe seguir el formato: Contener numeros e iniciar con za';
        return false;
      }

      this.emailError = '';
      return email; // Retorna el correo completo si es válido
    },
    async register() {
      try{
          const email = this.validateEmail();
          if (!email){
            return; // deten el registro di el correo no es valido
          }

          const userData={
              nombre: this.name,
              apellido: this.apellido,
              email: email,
              phone: this.phone,
              password: this.password
          }
          if(userData.password!= this.confirmpassword){
              alert('contraseñas incorrectas');
              throw new Error('Contraseñas invalidas');
          }
          const response = await fetch('http://localhost:3000/user/createUser',{
              method: 'POST',
              headers:{
                   'Content-Type': 'application/json',
              },
              body:JSON.stringify(userData)
          })
          if(!response.ok){
              throw new Error('Algo salio malo');
          }
          alert('Registro exitoso, redirigiendo al inicio de sesión...');
          setTimeout(() => {
      this.$router.push('/communityTSJZ/login'); 
          }, 1000);
      }catch(error){
          console.error('Error al iniciar sesión:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Página de registro */
.register-page {
  height: calc(100vh - 60px); /* Ajusta la altura para evitar colisiones */
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
}

/* Contenedor del registro */
.register-container {
  display: flex;
  max-width: 800px; /* Aumenta el ancho máximo aquí */
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

/* Sección del formulario */
.form-section {
  flex: 1;
  padding: 15px; /* Ajusta el padding aquí */
}

/* Ajusta el tamaño de la fuente */
h2 {
  text-align: center;
  margin-bottom: 10px; /* Reduce el margen */
}

.form-group {
  margin-bottom: 10px; /* Reduce el margen */
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px; /* Ajusta el padding de los inputs */
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 8px; /* Ajusta el padding del botón */
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

/* Sección de la imagen */
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.image-section img {
  max-width: 90%; /* Ajusta el tamaño máximo aquí */
  height: auto;
}

.email-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.email-input input {
  flex: 1;
  border: none;
  padding: 5px;
}

.email-input span {
  background-color: #f3f3f3;
  padding: 5px 10px;
  white-space: nowrap;
  border-left: 1px solid #ccc;
}

.error {
  color: red;
  font-size: 0.875rem;
}


/* Estilos responsivos */
@media (max-width: 768px) {
  .register-container {
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
