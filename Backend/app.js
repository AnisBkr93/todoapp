const express = require('express');
const path = require('path');
const User = require('./src/models/user');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dbSetup = require('./src/utils/database');
const cors = require('cors');
const taskRouter = require('./src/routes/taskRoutes');
const authRouter = require('./src/routes/userRoutes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
//app.use(cors());
app.use(bodyParser.json());
// app.use(history());

// Configuration des en-têtes de réponse pour gérer les requêtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    
    // Répondre aux pré-requêtes OPTIONS avec un statut 200 OK 
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
  // Route d'accueil
  app.get('/', (req, res) => {
    res.send('Bienvenue dans votre gestionnaire de tâches !');
  });
// Utilisation des routes
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






module.exports = app;


