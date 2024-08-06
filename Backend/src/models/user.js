// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const { createUniqueName } = require('typescript');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique : true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     tasks : [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Task'
//         }
//     ],
     
    
// });


// userSchema.pre('save', async function(next) {
//    if(!this.isModified('password')){
//        next();
//    }
//    const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.method.matchPassword = async function(enteredPassword){  
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// const User = mongoose.model('User', userSchema);
// module.exports = User;

// Importing required modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creating user schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Applying unique validator plugin to user schema
userSchema.plugin(uniqueValidator);

// Exporting user model
module.exports = mongoose.model('User', userSchema);