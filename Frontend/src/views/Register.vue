<template>
  <div class="container">
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmez le mot de passe :</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
    <p v-if="error !== ''" class="text-danger">{{ error }}</p>
    <p>Déjà inscrit? <router-link to="/login" class="link">Connectez-vous</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        if (this.password !== this.confirmPassword) {
          this.error = 'Les mots de passe ne correspondent pas.';
          return;
        }

        if (this.password.length < 5) {
          this.error = 'Le mot de passe doit comporter au moins 5 caractères.';
          return;
        }

        const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]+/;
        if (!specialCharacterRegex.test(this.password)) {
          this.error = 'Le mot de passe doit contenir au moins un caractère spécial.';
          return;
        }

        const response = await axios.post('/api/auth/register', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/login');
      } catch (error) {
        this.error = 'Erreur lors de l\'inscription.';
        console.error(error);
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
  margin-bottom: 20px;
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
    transition: border-color 0.3s, box-shadow 0.3s;
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

.text-danger {
  color: #d9534f;
  margin-top: 10px;
  font-weight: 700;
}

.link {
  color: #005bbb;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
}
</style>
