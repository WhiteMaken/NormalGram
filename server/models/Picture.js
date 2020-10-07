var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PictureModel = new Schema({

    upload_date: { type: Date,
        default: Date.now },
     
    picture_url:{
        type: String,
        required: true,},

    owner: {type: Schema.Types.ObjectId, ref: 'Post'}

});

module.exports = mongoose.model('Picture', PictureModel);
