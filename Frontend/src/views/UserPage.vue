<template>
  <div class="container">
    <h2>Bienvenue sur votre gestionnaire de tâches</h2>

    <!-- Bouton pour afficher le formulaire d'ajout de tâche -->
    <button @click="toggleTaskForm" class="btn btn-add-task">Ajouter une nouvelle tâche</button>

    <!-- Formulaire d'ajout de tâche (affiché lorsque showTaskForm est vrai) -->
    <task-form v-if="showTaskForm" @task-added="fetchTasks" />

    <!-- Bouton pour afficher la liste des tâches -->
    <button @click="toggleTaskList" class="btn btn-view-tasks">Mes tâches</button>

    <!-- Liste des tâches (affichée lorsque showTaskList est vrai) -->
    <div v-if="showTaskList" class="task-list-container">
      <task-list :tasks="tasks" @task-deleted="fetchTasks" />
      <div v-if="loadingTasks" class="loading-animation">Chargement en cours...</div>
    </div>

    <!-- Bouton de déconnexion -->
    <button @click="logout" class="btn btn-logout">Se déconnecter</button>
  </div>
</template>

<script>
import axios from 'axios';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';

export default {
  name: "UserPage",
  components: {
    TaskForm,
    TaskList,
  },

  data() {
    return {
      tasks: [],
      showTaskForm: false,
      showTaskList: true,
      loadingTasks: false,
    };
  },

  created() {
    this.fetchTasks();
  },

  methods: {
    async fetchTasks() {
      try {
        this.loadingTasks = true;
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/api/tasks/', { headers });
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingTasks = false;
      }
    },

    async logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },

    toggleTaskForm() {
      this.showTaskForm = !this.showTaskForm;
      if (this.showTaskList) {
        this.showTaskList = false;
      }
    },

    toggleTaskList() {
      this.showTaskList = !this.showTaskList;
      if (this.showTaskForm) {
        this.showTaskForm = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  max-width: 900px;
  margin: 20px auto;
  padding: 30px;
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

h2 {
  color: #00274d;
  margin-bottom: 30px;
  font-size: 2.4rem;
  font-weight: 700;
}

.btn {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  margin: 10px auto;
  transition: background-color 0.3s, transform 0.3s;
  
  &:focus {
    outline: none;
  }
}

.btn-add-task {
  background-color: #00274d;
  color: white;
  border: none;

  &:hover {
    background-color: #00274d;
    transform: translateY(-2px);
  }
}

.btn-view-tasks {
  background-color: #00274d;
  color: white;
  border: none;

  &:hover {
    background-color: #00274d;
    transform: translateY(-2px);
  }
}

.btn-logout {
  background-color: #b3091a;
  color: white;
  border: none;

  &:hover {
    background-color: #b3091a;
    transform: translateY(-2px);
  }
}

.task-list-container {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.loading-animation {
  font-size: 1.2rem;
  color: #00274d;
  margin-top: 20px;
}
</style>
