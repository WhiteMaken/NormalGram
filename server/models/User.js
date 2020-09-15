const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username:{
        type: String, 
        unique: true,
        required: true,
        maxlength: 20,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    name: { type: String },
     
    email:{
        type: String,
        unique:true,
        required: true,
        maxlength: 50},
});

module.exports = mongoose.model('users', UserModel);