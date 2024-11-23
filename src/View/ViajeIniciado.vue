<template>
    <div class="container">
      <div class="loading-symbol"></div>
      <div class="loading-container">
        <h2>Estás en viaje</h2>
      </div>
      <div id="carrito"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ViajeIniciado'
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6; /* Fondo más claro */
    font-family: Arial, sans-serif;
    position: relative;
  }
  
  .loading-container {
    margin-top: 20px;
    font-size: 2rem;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  
  .loading-symbol {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top: 5px solid #555;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
  }
  
  #carrito {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100px;
    height: 100px;
    background-image: url('https://img.icons8.com/?size=100&id=oizVkflf4uIT&format=png&color=000000');
    background-size: contain;
    background-repeat: no-repeat;
    animation: moveCarrito 4s linear infinite alternate;
  }
  
  /* Animaciones */
  @keyframes moveCarrito {
    0% {
      left: 0;
      transform: scaleX(1);
    }
    100% {
      left: calc(100% - 100px);
      transform: scaleX(-1);
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  