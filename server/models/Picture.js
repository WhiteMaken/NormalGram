const ttl = require ('mongoose-ttl');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PictureModel = new Schema({
    createdAt: { type: Date, default: Date.now, index: { expires: 50 } },
     
    picture_url:{
        type: String,
        required:false,},

    owner: {type: Schema.Types.ObjectId, ref: 'Post'}

});
PictureModel.plugin(ttl, { ttl: 45 });

module.exports = mongoose.model('Picture', PictureModel);
