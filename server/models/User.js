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

    posts:[{type: Schema.Types.ObjectId, ref:'Post'}]
});

module.exports = mongoose.model('users', UserModel);