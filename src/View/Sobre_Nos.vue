
<template>
  <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/imgTSJ.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/imgTSJ1.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/imgTSJ3.jpg" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <section class="about-us">
  <div class="about-content">
      <h1>Sobre Nosotros</h1>
      <p>
        En TSJcomunity, nos dedicamos a transformar la experiencia estudiantil a través de soluciones tecnológicas innovadoras. 
        Nuestro proyecto surge de la necesidad de modernizar los servicios que ofrece la institución, creando una extensión digital 
        de la página oficial del Tecnológico Superior de Jalisco.
      </p>
  </div>
</section>
<section class="our-goal">
  <div class="goal-content">
      <h1>Nuestro Objetivo</h1>
      <p>
        Fomentar el uso de herramientas digitales, empoderando a la comunidad estudiantil 
        y fortaleciendo la conexión entre estudiantes y personal académico. En TSJcomunity , 
        estamos comprometidos con el futuro digital de nuestra comunidad universitaria, creando
         un entorno más accesible, seguro y colaborativo para todos.
      </p>
      <p>
        Crear una plataforma digital que permita conectar a estudiantes con automóvil dispuestos 
        a ofrecer servicios de transporte compartido con otros estudiantes que necesitan una manera 
        más eficiente y económica de llegar a la escuela, fomentando la colaboración entre la comunidad 
        estudiantil, reduciendo costos.
      </p>
  </div>
  <div class="goal-image">
    <img src="../assets/logo.jpeg" alt="Descripción de la imagen">
  </div>
</section>
</template>

<script>
import  EventBus from '../eventBus';
export default {
data() {
  return{
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
<style>


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



