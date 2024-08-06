<template>
  <div class="d-flex justify-content-center task-list-container">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date limite</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <transition-group name="fade" tag="tbody">
            <tr v-for="task in tasks" :key="task._id">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>{{ formatDeadline(task.deadline) }}</td>
              <td>{{ task.status }}</td>
              <td>
                <button @click="deleteTask(task._id)" class="btn btn-danger btn-sm">Supprimer</button>
                <router-link :to="'/update/' + task._id" class="btn btn-primary btn-sm">Mettre à jour</router-link>
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/api/tasks', { headers });
        this.tasks = response.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    formatDeadline(deadline) {
      return new Date(deadline).toLocaleDateString();
    },
    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`/api/tasks/deletetask/${taskId}`, { headers });
        this.fetchTasks();
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};
</script>

<style scoped>
.task-list-container {
  width: 100%;
  margin: 20px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #343a40;
  color: white;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.btn {
  margin-right: 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
