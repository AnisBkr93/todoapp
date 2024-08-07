<template>
  <div class="container">
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p><router-link to="/forgotpassword">Mot de passe oublié ?</router-link></p>
    <p>Pas encore de compte? <router-link to="/register">Inscrivez-vous</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Enregistrez le token JWT reçu dans le localStorage
        localStorage.setItem('token', response.data.token);

        // Redirigez l'utilisateur vers la page d'accueil ou une autre page après la connexion
        this.$router.push('/UserPage');
      } catch (error) {
        this.error = 'Paire email/mot de passe incorrecte';
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

.text-danger {
  color: #d9534f;
  margin-top: 10px;
}

p {
  margin-top: 15px;

  a {
    color: #005bbb;
    text-decoration: none;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
