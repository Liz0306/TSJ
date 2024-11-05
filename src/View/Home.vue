<template>

    <!---------------------------NAVBAR------------------------------>
      <div class="hello">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TSJ_Communisty</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Somos TSJ 
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">¿Quienes somos?</a></li>
                <li><a class="dropdown-item" href="#">Directorio</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
    
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="https://edcore.tecmm.mx/alum/login.jsp" target="_blank" rel="noopener noreferrer">EDCORE</a>
            </li>
    
            <li class="nav-item">
              <a class="nav-link" href="#">Admisión</a>
            </li>
            
            <li class="nav-item">
              <router-link class="nav-link" to="/Becas">Becas</router-link>
            </li>
    
            <li class="nav-item">
                <router-link class="nav-link" to="/communityTSJZ">TSJcommunity</router-link>
            </li>
    
    
          </ul>
          
    
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
      </div>
    
    <!--------------------------------CARRUSEL------------------------------------->
    
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/imgPrincipal.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../assets/imgPrincipal2.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../assets/imgPrincipal3.png" class="d-block w-100" alt="...">
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


    <tarjetaMain></tarjetaMain>

    <UbicacionMain></UbicacionMain>

    
    <FooterMain></FooterMain>
    
    </template>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>

   





@media (max-width: 600px) {
  .row {
    -webkit-flex-direction: column;
    flex-direction: column;
  }
}
    
    
    
    h3 {
      margin: 40px 0 0;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
    </style>
    
    <script>
    import FooterMain from '../components/footer.component.vue'
    import tarjetaMain from '../components/tarjetas.vue'
    import UbicacionMain from '../components/UbicacionEscuela.vue'
    
    export default {
      name: 'HelloWorld',
      props: {
        msg: String
      },
      components:{
        FooterMain,
        tarjetaMain,
        UbicacionMain,
      
      }
    
    
    }
    
    </script>
    