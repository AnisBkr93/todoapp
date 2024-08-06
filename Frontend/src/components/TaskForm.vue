<template>
  <div class="task-form-container">
    <h3>Ajouter une nouvelle tâche</h3>
    <form @submit.prevent="addTask" class="task-form">
      <div class="form-group">
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea id="description" v-model="description" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="deadline">Date limite :</label>
        <input type="date" id="deadline" v-model="deadline" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="status">Statut :</label>
        <select id="status" v-model="status" class="form-control" required>
          <option selected value="Envisagé">Envisagé</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
          <option value="En attente">En attente</option>
        </select>
      </div>
      <button type="submit" class="btn btn-success">Ajouter</button>
    </form>
    <transition name="fade">
      <p v-if="message" class="text-success">{{ message }}</p>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      deadline: '',
      status: 'Envisagé', 
      message: ""
    };
  },
  methods: {
    async addTask() {
      try {
        const token = localStorage.getItem('token'); 
        const headers = { Authorization: `Bearer ${token}` };
        const data = {
          title: this.title,
          description: this.description,
          deadline: this.deadline,
          status: this.status,
        };
        await axios.post('/api/tasks/newtask',  {data: data} ,  { headers: {...headers,'Content-Type': 'application/json', },});
        this.$emit('task-added'); 
        this.title = '';
        this.description = '';
        this.deadline = '';
        this.status = 'Envisagé';
        this.message = "Tâche ajoutée avec succès";
        
        setTimeout(() => {
          this.message = ""
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.task-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.task-form h3 {
  margin-bottom: 20px;
  text-align: center;
  color: #343a40;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #495057;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-control:focus {
  border-color: #80bdff;
  outline: none;
  box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
}

.btn-success {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
}

.text-success {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  color: #28a745;
  transition: opacity 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
