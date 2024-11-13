<template>
    <div class="loading-symbol"></div>
    <div class="loading-container">
    
      <h2>Estás en viaje</h2>
    
    </div>
    <div id="carrito"></div>

</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

.loading-container {
    position: absolute;
  font-size: 2rem;
  color: #555;
  font-weight: bold;
}

#carrito {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-image: url('https://img.icons8.com/?size=100&id=oizVkflf4uIT&format=png&color=000000');
    background-size: contain;
    background-repeat: no-repeat;
    animation: moveCarrito 4s linear infinite alternate;
}

.loading-symbol {
    position: absolute;
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #555;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

h2 {
    margin-top: 10px;
    font-size: 24px;
    color: #333;
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