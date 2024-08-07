<template>
  <div class="home-container">
    <h1>Bienvenue sur Gestionnaire de Tâches</h1>
    <div class="options">
      <router-link to="/register" class="option">
        <button class="btn btn-register">S'inscrire</button>
      </router-link>
      <router-link to="/login" class="option">
        <button class="btn btn-login">Se connecter</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.home-container {
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
  padding: 40px 20px;
  background: #f4f4f9;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: 'Roboto', sans-serif;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: 700;
    color: #00274d;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .option {
      text-align: center;
    }

    .btn {
      padding: 12px 25px;
      font-size: 1.2rem;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s, transform 0.3s, color 0.3s;
      font-family: 'Roboto', sans-serif;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

      &.btn-register {
        background-color: #00274d;
        color: white;
      }

      &.btn-register:hover {
        color: #00274d;
        background-color: white;
        transform: scale(1.05);
        border: 2px solid #00274d;
      }

      &.btn-login {
        background-color: #00274d;
        color: white;
      }

      &.btn-login:hover {
        color: #00274d;
        background-color: white;
        transform: scale(1.05);
        border: 2px solid #005bbb;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .options {
      flex-direction: row;

      .option {
        flex: 1;
      }
    }
  }
}
</style>
