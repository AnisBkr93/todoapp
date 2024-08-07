<template>
  <div class="container">
    <h2>Mot de passe oublié</h2>
    <form @submit.prevent="requestPasswordReset">
      <div class="form-group">
        <label for="email">Adresse e-mail :</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Réinitialiser le mot de passe</button>
    </form>
    <p v-if="message" class="text-info">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "forgotPassword",
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    async requestPasswordReset() {
      try {
        const response = await axios.post('/api/auth/forgot-password', { email: this.email });
        this.message = response.data.message;
      } catch (error) {
        console.error(error);
        this.message = "Erreur lors de la réinitialisation du mot de passe. Veuillez vous assurer de rentrer l'email utilisé lors de l'inscription";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

h2 {
  color: #00274d;
  margin-bottom: 20px;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .form-control:focus {
    border-color: #00274d;
    box-shadow: 0 0 5px rgba(0, 39, 77, 0.2);
  }
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #005bbb;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #004494;
    transform: translateY(-2px);
  }
}

.text-info {
  color: #005bbb;
  margin-top: 10px;
  font-weight: 700;
}
</style>
