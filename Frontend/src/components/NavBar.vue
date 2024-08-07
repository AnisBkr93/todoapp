<template>
  <div>
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="app">
      <div class="container-fluid">

        <!-- Marque de la navigation (Logo ou nom du site) -->
        <a class="navbar-brand" href="/">Gestionnaire de Tâches</a>

        <!-- Bouton de basculement pour les petits écrans -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Contenu de la barre de navigation -->
        <div class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }" id="navbarNavDropdown">
          <!-- Liste des liens de navigation -->
          <ul class="navbar-nav navbar-left">
            <li class="nav-item">
              <!-- Lien vers la page 'UserPage' -->
              <router-link to="/UserPage" class="nav-link">Dashboard</router-link>
            </li>
            
          </ul>
          <ul class="navbar-nav ms-auto navbar-right">
            <li class="nav-item">
              <!-- Lien vers la page 'login' -->
              <router-link to="/login" class="nav-link">Connexion</router-link>
            </li>
            <li class="nav-item">
              <!-- Lien vers la page 'register' -->
              <router-link to="/register" class="nav-link">Inscription</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Vue du routeur, où les composants s'affichent en fonction de la route actuelle -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isNavbarOpen: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
  },
};
</script>

<style lang="scss">
.navbar {
  padding: 15px 20px;
  background-color: #00274d; /* Dark blue background */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-weight: bold;
  color: #ffffff;
  font-size: 24px;
  letter-spacing: 1px;
}

.navbar-toggler {
  border-color: #ffffff;
}

.navbar-toggler-icon {
  background-image: url('data:image/svg+xml;base64,...'); /* You can use a custom icon here */
}

.navbar-nav {
  display: flex;
}

.navbar-left {
  display: flex;
}

.navbar-right {
  display: flex;
  margin-left: auto;
}

.nav-link {
  font-weight: 500;
  color: #ffffff;
  margin-right: 20px;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #d3d3d3; /* Light grey on hover */
}

.router-link-exact-active {
  text-decoration: underline;
}

.collapse {
  transition: max-height 0.3s ease;
}
</style>
