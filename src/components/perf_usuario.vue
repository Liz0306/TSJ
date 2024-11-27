<template>
  <div class="profile-container">
    <!-- Imagen de perfil -->
    <div class="profile-image">
      <img ref="profilePic" :src="profileImage" alt="Foto de perfil" />
      <input
        type="file"
        id="upload"
        accept="image/*"
        class="upload-btn"
        @change="uploadImage"
      />
      <label for="upload" class="upload-label">Subir Imagen</label>
    </div>

    <!-- Información de perfil -->
    <div class="profile-info">
      <div class="info-box">
        <h2>Perfil</h2>
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Apellido:</strong> {{ user.lastName }}</p>
        <p><strong>Teléfono:</strong> {{ user.phone }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <!-- Sección de carros -->
      <div class="cars-section">
        <h2>Mis Carros</h2>
        <button class="add-car-btn" @click="addCar">Agregar Carro</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: "https://via.placeholder.com/200", // Imagen inicial
      user: {
        name: "John",
        lastName: "Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com",
      },
    };
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result; // Actualiza la imagen
        };
        reader.readAsDataURL(file);
      }
    },
    addCar() {
      alert("Funcionalidad de agregar carro no implementada.");
    },
  },
};
</script>

<style scoped>
/* Ajustes del componente */
.profile-container {
  display: flex;
  width: 100%;
  height: auto;
  gap: 20px;
  padding: 20px;
}

.profile-image {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

.profile-image img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 4px solid #007bff;
}

.upload-btn {
  display: none;
}

.upload-label {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-label:hover {
  background-color: #0056b3;
}

.profile-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-box {
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.info-box h2 {
  margin-bottom: 10px;
  color: #007bff;
}

.cars-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-car-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-car-btn:hover {
  background-color: #0056b3;
}
</style>
