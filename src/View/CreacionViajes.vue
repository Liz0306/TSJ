<template>
  <div class="container">
    <h1>Haz una Publicación</h1>
    <textarea v-model="postContent" placeholder="Descripción general de la publicación"></textarea>
    <div>
      <label for="salida">Salida:</label>
      <select v-model="punto_salida">
          <option disabled value="">Seleccione un punto de salida</option>
          <option value="Camino Arenero">Camino Arenero</option>
          <option value="Universidad">Universidad</option>
      </select>
    </div>

    <div>
      <label for="punto_destino">Destino:</label>
      <select v-model="punto_destino">
        <option disabled value="">Seleccione un punto de destino</option>
        <option value="Camino Arenero">Camino Arenero</option>
        <option value="Universidad">Universidad</option>
      </select>
    </div>
    <div>
      <label for="hora_salida">Hora de Salida:</label>
      <input type="time" v-model="hora_salida" >
    </div>
    <div>
      <label for="cupo_disponible">Cantidad de Cupo:</label>
      <input type="number" v-model="cupo_disponible" placeholder="Ej. 4" >
    </div>
    <div>
      <label for="tarifa">Tarifa que deseas poner</label>
      <input type="number" v-model="tarifa" placeholder="$30" >
    </div>
    <div>
        <label for="carros">Carro que deseas elegir</label>
        <select id="carros" name="carros" v-model="selectedCarro">
          <option v-for="carro in carros" :key="carro.id_carro" :value="carro.id_carro">
            {{ carro.modelo }}
          </option>
        </select>
      </div>
    <!-- <input type="file" @change="onImageChange" accept="image/*"> -->
    <h3>Elige un color de fondo:</h3>
    <div id="colorPicker">
      <button
        v-for="(color, index) in colors"
        :key="index"
        :style="{ backgroundColor: color }"
        class="color-btn"
        @click="selectColor(color)">
      </button>
    </div>
    <button @click="post">Publicar </button>
   </div>
  <div >
</div>
</template>

<script>
import EventBus from '@/eventBus.js'; 

export default {
  name: 'PostCreate',
  data() {
  return {
    postContent: '',
    punto_salida: '',
    punto_destino: '',
    hora_salida: '',
    cupo_disponible: '',
    selectedColor: '#FFFFFF',
    colors: ['#FFD700', '#FF4500', '#1E90FF', '#32CD32', '#FF69B4'],
    showConfirmation: false, 
    tarifa:0,
    carros:[],
    selectedCarro:null,
  };
},
created(){
  this.fetchCarros();
},
methods: {
  async fetchCarros(){
    try{
        const response = await fetch('http://localhost:3000/carros/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('No se pudieron cargar los carros');
        }
        const data = await response.json();
        this.carros = data;
    }catch(e){
      console.error("Sucedió un error al obtener los carros", e);
    }
  },
  publicacionPost(newPost){
    EventBus.emit('new-post',newPost);
  },
  async post() {
    if (this.punto_salida && this.punto_destino && this.hora_salida && this.cupo_disponible && this.postContent) {
      const newPost = {
        id_carro: this.selectedCarro,
        punto_salida: this.punto_salida,
        punto_destino: this.punto_destino,
        hora_salida: this.hora_salida,
        cupo_disponible: this.cupo_disponible,
        tarifa: this.tarifa,
        comentario:"viaje seguro y comodo"
      };
          try {
        const response = await fetch('http://localhost:3000/api/viaje', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newPost),  
        });

        if (!response.ok) {
            throw new Error('Algo salió mal');
        }
        this.$nextTick(() => {
            this.$router.push('/communityTSJZ/raite');
        });
        alert('Publicación creada exitosamente');
    } catch (e) {
        console.error("Sucedió un error ", e);
    }     
    } else {
      alert("Por favor, completa todos los campos.");
    }
  },
  confirmPost() {
    this.clearFields(); 
  },
  clearFields() {
    this.postContent = '';
    this.punto_salida = '';
    this.punto_destino = '';
    this.hora_salida = '';
    this.cupo_disponible = '';
    this.imageSrc = '';
    this.selectedColor = '#FFFFFF';
  }
}
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f4f4f9;
  padding: 20px;
}

.container {
  max-width: 600px; /* Reduce el ancho para un diseño más compacto */
  margin: 0 auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 15px; /* Reduce margen para menor espacio vertical */
}

textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: none;
  min-height: 80px; /* Reduce altura mínima */
}

input[type="text"],
input[type="number"],
input[type="time"] {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

#colorPicker {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.color-btn {
  width: 35px; /* Reduce tamaño de los botones de color */
  height: 35px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.color-btn:hover,
.color-btn.selected {
  border-color: #333;
}

button {
  width: 100%;
  padding: 12px; /* Reduce padding para menor altura */
  font-size: 16px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #006bb3;
}

.confirmation-container {
  margin-top: 15px;
  text-align: center;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

/* Estilo en fila para agrupar ciertos campos */
.row {
  display: flex;
  gap: 10px;
}

.row > div {
  flex: 1;
}
</style>
