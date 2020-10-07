var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostModel = new Schema({

    unique_views:{
        type: Number, 
        required: true,
        default: 0,
    },

    text:{
        type:String,
        maxlength: 350,
        required: true,
        default: '',
    },

    upload_date: { 
        type: Date,
        required: true,
        default: Date.now,
    },
     
    likes:{
        type: Number,
        required: true,
        default: 0,
    },

    picture:{
        type: String},

    owner: {type:Schema.Types.ObjectId, ref: 'User', required:true}

});

module.exports = mongoose.model('Post', PostModel);

