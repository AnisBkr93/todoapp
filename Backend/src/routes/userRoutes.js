// const express = require('express');
// const User = require('../models/user');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// router.use(bodyParser.json());
// const auth = require('../middlewares/auth');


// const createJWT = (res , userId ) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: "1d"
//     });
//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== 'development',
//         maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day

//     });
//     return token;
// }


// router.get('/test' ,  (req, res) => {
//     res.send('user API is working !');   
// });

// //register user
 
// router.post('/register', async (req, res) => {
//     const { username , email , password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.send({ message: 'User already exists' });
//         }
//         const user = new User(req.body);
//         await user.save();
//         console.log('user created is : ' , user);
//         res.status(201).send({user , message : 'User created successfully'});
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }
// );

// // Login route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.send({ message: 'Invalid email , you have to register before !' });
//         }
//         const isMatch = await bcrypt.compare(password, existingUser.password);
//         if( existingUser && isMatch) {
//             createJWT(res, existingUser._id);
//             existingUser.password = undefined;
//             res.send({ existingUser , message: 'User logged in successfully' });
//         } else {
//             res.send({ message: 'Invalid password' });
//         }
    
//     } catch (error) {
//         console.error(error);
//         return res.status(400).send({ message: 'Login failed' });
//     } 
// });
    
// // Logout route
// router.post('/logout',  async (req, res) => {
//     try {
//         res.cookie('token', '', {
//             httpOnly: true,
//             expires: new Date(0),
//         });
//        res.send({ message: 'Logged out successfully' });
//     }
//     catch (error) {
//         res.status(400).send(error);
// } 
// });

// router.put('/update', async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const { _id } = req.body;
//         const id = _id;
//         const user  = await User.findById(id);
//         if(user){
//             user.username = req.body.username;
//             user.email = req.body.email;
//             user.password = req.body.password;
//             const updatedUser = await user.save();
//             user.password = undefined;
//             res.send({ user , message: 'User updated successfully' , user : updatedUser });
//         } else {
//             res.send({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.put('/change-password', async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const user  = await User.findById(userId);
//         if(user){
//             user.password = req.body.password;
//             await user.save();
//             user.password = undefined;
//             res.send({ user , message: 'Password updated successfully' });
//         } else {
//             res.send({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.delete('/delete', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user  = await User.findByIdAndDelete(id);
//         if(user){
//             res.send({ message: 'User deleted successfully' });
//         } else {
//             res.send({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.send(error);
//     }
// });




     

// module.exports = router;


// Importation des modules
const express = require('express');
const router = express.Router();

// Importation du contrôleur utilisateur
const userCtrl = require('../controllers/userController');

// Route pour l'enregistrement d'un utilisateur
router.post('/register', userCtrl.register);

// Route pour la connexion d'un utilisateur
router.post('/login', userCtrl.login);

// Route pour la récupération du mot de passe oublié
router.post('/forgot-password', userCtrl.forgotPassword);

// Route pour la réinitialisation du mot de passe
router.post('/reset-password', userCtrl.resetPassword);

// Exportation du routeur
module.exports = router;