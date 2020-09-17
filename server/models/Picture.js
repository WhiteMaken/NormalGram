var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PictureModel = new Schema({
    
    upload_date: { type: Date },
     
    picture_id:{
        type: String,
        required: true,},

});

module.exports = mongoose.model('Picture', PictureModel);
