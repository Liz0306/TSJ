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
  };
},
methods: {
  publicacionPost(newPost){
    EventBus.emit('new-post',newPost);
  },
  async post() {
    if (this.punto_salida && this.punto_destino && this.hora_salida && this.cupo_disponible && this.postContent) {
      const newPost = {
        id_carro: 1,
        punto_salida: this.punto_salida,
        punto_destino: "this.punto_destino",
        hora_salida:"2024-10-25 15:00:00",
        cupo_disponible: 4,
        // postContent: this.postContent,
        // color: this.selectedColor,
        tarifa: this.tarifa,
        comentario:"viaje seguro y comodo"
        // id_carro: 1,
        // punto_salida: "uwu",
        // punto_destino: "Tecmm",
        // hora_salida: "2024-10-25 15:00:00",
        // cupo_disponible: 4,
        // tarifa: 10,
        // comentario: "Viaje seguro y cómodo."
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

        console.log(newPost);
       // this.publicacionPost(newPost);
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  resize: none;
  min-height: 100px;
}

input[type="text"],
input[type="number"],
input[type="time"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

input[type="file"] {
  margin-bottom: 20px;
}

#colorPicker {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.color-btn {
  width: 40px;
  height: 40px;
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
  padding: 15px;
  font-size: 16px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #006bb3;
}


.confirmation-container {
  margin-top: 20px;
  text-align: center;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>



