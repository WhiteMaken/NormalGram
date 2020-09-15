var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostModel = new Schema({
    unique_views:{
        type: Number, 
        required: true,
    },
    text:{
        type:String,
        maxlength: 350,
    },
    upload_date: { 
        type: Date,
        required: true, },
     
    likes:{
        type: Number,
        required: true,},

    owner:{
        type: Schema.Types.ObjectID, 
        ref: 'User',
    } 
});

module.exports = mongoose.model('Post', PostModel);
