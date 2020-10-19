var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CommentModel = new Schema({

    upload_date: { type: Date,
        default: Date.now },
     
    text:{
        type: String,
        required: true,},

    owner: {type: Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Comment', CommentModel);
