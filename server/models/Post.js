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

    picture:{ type: Schema.Types.ObjectId, ref: 'Picture'}
});

module.exports = mongoose.model('Post', PostModel);

