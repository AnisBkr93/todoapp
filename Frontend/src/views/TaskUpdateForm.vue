<template>
    <div>
      <h3>Modifier la tâche</h3>
      <form @submit.prevent="updateTask">
        <div class="form-group">
          <label for="title">Titre :</label>
          <input type="text" id="title" v-model="taskData.title" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="description">Description :</label>
          <textarea id="description" v-model="taskData.description" class="form-control" required></textarea>
        </div>
        <div class="form-group">
          <label for="deadline">Date limite :</label>
          <input type="date" id="deadline" v-model="taskData.deadline" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="status">Statut :</label>
          <select id="status" v-model="taskData.status" class="form-control" required>
            <option  selected :value="taskData.status">{{ taskData.status }}</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
            <option value="Reportée">Reportée</option>
          </select>
        </div>
        <div v-if="loading">
          <div class="loading-animation">Chargement en cours...</div>
        </div>
        <div v-else>
          <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </div>
        <div v-if="successMessage" class="text-success">{{ successMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default 
  {
    data() 
    {
      return {
        taskData: 
        {
          title: '',
          description: '',
          deadline: '',
          status: 'En cours',
        },
        taskId: this.$route.params.taskId,
        loading: false, // Variable pour gérer l'affichage de l'animation de chargement
        successMessage: '', // Message de succès
      };
    },
  
    methods: 
    {
      async updateTask() 
      {
        try {
          this.loading = true; // Activez l'animation de chargement pendant la soumission
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          await axios.put(`/api/tasks/updatetask/${this.taskId}`, this.taskData, { headers });
          // Émettez un message de succès
          this.successMessage = 'Tâche mise à jour avec succès.';
        } 
        
        catch (error) 
        {
          console.log(error);
        } 
  
        finally 
        {
          this.loading = false; // Désactivez l'animation de chargement après la soumission
        }
      },
  
      async fetchTaskData() 
      {
        try 
        {
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(`/api/tasks/${this.taskId}`, { headers });
          // Formatez la date au format "yyyy-MM-dd"
          const taskData = response.data;
          taskData.deadline = new Date(taskData.deadline).toISOString().split('T')[0];
          this.taskData = response.data;
        } 
  
        catch (error) 
        {
          console.log(error.message);
        }
      },
    },
  
    watch: 
    {
      taskId: 'fetchTaskData',
    },
    
    created() 
    {
      this.fetchTaskData();
    },
  };
  </script>
  
  <style scoped>
  /* Container styling */
div {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Heading styling */
h3 {
  color: #00274d;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

/* Form group styling */
.form-group {
  margin-bottom: 15px;
}

/* Label styling */
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #00274d;
}

/* Input and textarea styling */
.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #00274d;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 68, 148, 0.2);
}

/* Button styling */
.btn-primary {
  background-color: #00274d;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* Loading animation styling */
.loading-animation {
  color: #007bff;
  font-size: 1rem;
  text-align: center;
  margin-top: 15px;
}

/* Success message styling */
.text-success {
  color: #bd0a0a;
  font-size: 1rem;
  margin-top: 15px;
  text-align: center;
}

  </style>