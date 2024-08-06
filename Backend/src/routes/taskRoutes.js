// const express = require('express');
// const Task = require('../models/task');
// const User = require('../models/user');
// const auth = require('../middlewares/auth');
// const router = express.Router();

// router.get('/test' ,  (req, res) => {
//     res.send('Task API is working !');   
// });


// //create task
// router.post('/create',  async (req, res) => {
//     const { title , description , status , priority } = req.body;
//       try {
//         const newTask = new Task(req.body);
//         await newTask.save();
//         res.status(201).send({newTask , message : 'Task created successfully'});
//     } catch (error) {
//         res.status(400).send(error);
//     }

    
// });

// router.post('/activity/:id', async (req, res) => {
//     const { id } = req.params;
//     const { userId } = req.user;
//     const { type , activity } = req.body;  
//     try {
//         const task = await Task.findById(id);

//         const newActivity = {
//             type,
//             activity,
//             by: userId
//         };

//         task.activities.push(newActivity);
//         await task.save();
//         res.send({ task , message: 'Activity added successfully' });
//     }
//     catch (error) {
//         res.status(400).send(error);
//     }
// }
// );

// router.get("/all", async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.status(200).send(tasks);
//     } catch (error) {
//         res.status(500).send(error);

//     }
// }
// );

// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const task = await Task.findById(id).populate({
//             path : 'activities.by',
//             select : 'username email'
//         }).sort({ _id : -1 });


//         if (!task) {
//             return res.status(404).send({ message: "Task not found" });
//         }
//         res.status(200).send(task , { message: 'Task found ' });
//     } catch (error) {
//         res.send(error);
//     }
// }
// );

// router.put('/update/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title , description , status , priority } = req.body;
//     try {
//         const task = await Task.findById(id);
//         task.title = title;
//         task.description = description;
//         task.status = status;
//         task.priority = priority;
//         await task.save();
//         res.send({ task , message: 'Task updated successfully' });
//     } catch (error) {
//         res.send(error);
//     }
// }
// );

// router.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const task = await Task.findByIdAndDelete(id);
//         if (!task) {
//             return res.status(404).send({ message: 'Task not found' });
//         }
//         res.send({ task , message: 'Task deleted successfully' });
//     } catch (error) {
//         res.send(error);
//     }
// }
// );


// //CRUD operations for Task

// //Create Task
// // router.post('/create', async (req, res) => {
// //     try {
// //         const { title , description  } = req.body;
// //         const { id } = req.headers;
// //         const newTask = new Task(req.body);
// //         await newTask.save();
// //         id = newTask._id ;
// //         await User.findByIdAndUpdate(id, { $push: { tasks: newTask._id } });
// //         res.status(201).send({newTask , message : 'Task created successfully'});
// //     } catch (error) {
// //         res.status(400).send(error);
// //     }
// // });

// module.exports = router;

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/auth');

// Route pour récupérer la liste des tâches de l'utilisateur
router.get('/', authenticate, taskController.getTask);

//Route pour récupérer les informations d'une seule tâche
router.get('/:id',authenticate ,  taskController.getOneTask)

// Route pour créer une nouvelle tâche
router.post('/newtask', authenticate, taskController.createTask);

// Route pour mettre à jour une tâche par son ID
router.put('/updatetask/:taskId', authenticate, taskController.updateTask);

// Route pour supprimer une tâche par son ID
router.delete('/deletetask/:taskId', authenticate, taskController.deleteTask);

module.exports = router;