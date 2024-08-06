// const mongoose = require('mongoose');
// const date = new Date();
// const TaskSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     status : {
//         type: String,
//         default: 'to-do',
//         enum: ['to-do', 'in-progress', 'completed'],
//     },
//     priority : {
//         type: String,
//         default: 'normal',
//         enum: ['low', 'medium', 'normal' , 'high'],
//     },
//     activities : {
//         type: String,
//         default : 'assigned',
//         enum: [
//             'assigned',
//             'started',
//              'in-progress',
//               'completed',
//             ],
//         activity : String,
//         date : 
//         {
//             type: Date,
//             default: new Date()
//         },
//         by : {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         },

//     },
    
//     });
       

// // middleware to update the updated_at field before saving
// // TaskSchema.pre('save', function(next) {
// //     this.updated_at = date;
// //     next();
// // });



// module.exports = mongoose.model('Task', TaskSchema);

// Importation du module mongoose
const mongoose = require('mongoose');
const date = new Date();

// Définition du schéma de la tâche
const taskSchema = new mongoose.Schema({
  title: String, // Titre de la tâche
  description: String, // Description de la tâche
  deadline: Date , // Date limite de la tâche
  status: String, // Statut de la tâche
  user: { // Utilisateur associé à la tâche
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Exportation du modèle Task basé sur le schéma taskSchema
module.exports = mongoose.model('Task', taskSchema);