<template>
  <div class="d-flex justify-content-center">
    <div class="table-responsive">
    <table class="table">
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
        <tr v-for="task in tasks" :key="task._id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDeadline(task.deadline) }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button @click="deleteTask(task._id)" class="btn btn-danger">Supprimer</button>
            <router-link :to="'/update/' + task._id" class="btn btn-primary">Mêttre à jour</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['tasks'],
  methods: {
    formatDeadline(deadline) {
      return new Date(deadline).toLocaleDateString();
    },
    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`/api/tasks/deletetask/${taskId}`, { headers });
        this.$emit('task-deleted');
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Container for centering the table */
.d-flex {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

/* Table styling */
.table {
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Table header styling */
.table thead {
  background-color: #0056b3;
  color: #ffffff;
}

.table thead th {
  padding: 12px 15px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}

/* Table body styling */
.table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.table tbody td {
  padding: 12px 15px;
  font-size: 14px;
}

/* Hover effect for table rows */
.table tbody tr:hover {
  background-color: #f1f1f1;
}

/* Button styling for actions */
.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

</style>