<template>
  <div>
    <h3>Ajouter une nouvelle tâche</h3>
    <form @submit.prevent="addTask">
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
        <input type="date" id="deadline" v-model="deadline" class="form-control" :min="minDate" required>
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
      <div>
            <br>
        <button type="submit" class="btn btn-success">Ajouter</button>

      </div>
    </form>
    <p class="text-success"> {{ message }}   </p>
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
      minDate: new Date().toISOString().split('T')[0], // Date minimale autorisée
      status: 'Envisagé', // Valeur par défaut du statut,
      message: ""
    };
  },
  methods: {
      async addTask() 
      {
          try {
              const token = localStorage.getItem('token'); // Assurez-vous de stocker le token correctement
              const headers = { Authorization: `Bearer ${token}` };
              const data = 
              {
              title: this.title,
              description: this.description,
              deadline: this.deadline,
              status: this.status, // Ajout du statut
              };
              //console.log(data)
              await axios.post('/api/tasks/newtask',  {data: data} ,  { headers: {...headers,'Content-Type': 'application/json', },});
              this.$emit('task-added'); // Émet un événement pour informer le parent de l'ajout de la tâche
              this.title = '';
              this.description = '';
              this.deadline = '';
              
              this.message = "Tâche ajoutée avec succès"

              setTimeout(()=>
              {
                this.message = ""
              }, 5000)
          } 
          catch (error) 
          {
              console.log(error);
          }
      },
  },
};
</script>

<style scoped>
/* Utilisez ici vos styles CSS pour personnaliser l'apparence du formulaire de tâche */
/* Button styling */
.btn-success {
  background-color: #000000;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-success:hover {
  background-color: #00274d;
  transform: translateY(-2px);
}

/* Success message styling */
.text-success {
  color: #f70000;
  font-size: 1rem;
  margin-top: 15px;
  text-align: center;
}
</style>
