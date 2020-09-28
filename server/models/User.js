const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username:{
        type: String, 
        unique: true,
        required: true,
        maxlength: 20
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
    
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});


//this method will hash the password before saving the user model
UserModel.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
  
//this method generates an auth token for the user
UserModel.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, username: user.username, email: user.email },
        'secret');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
  
//this method search for a user by username and password.
UserModel.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error({ error: 'Invalid login details' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login details' });
    }
    return user;
};

module.exports = mongoose.model('users', UserModel);
const User = mongoose.model('User', UserModel);
module.exports = User;
