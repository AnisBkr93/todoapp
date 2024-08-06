<template>
  <!-- Le conteneur principal de l'application -->
  <div id="app">
    <!-- Barre de navigation -->
    <nav-bar />
    <!-- Pied de page avec des informations de copyright -->
    <copyright />
  </div>
</template>

<script>
import Copyright from './components/Copyright.vue';
import NavBar from './components/NavBar.vue';

export default 
{
  name: 'App', 
  components: { 
    Copyright, 
    NavBar, 
  },
};
</script>

<style lang="scss">
/* Styles CSS pour l'apparence de la page */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  width: 100%;
}
</style>