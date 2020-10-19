var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var storySchema = new Schema({  
    contentType:String,
    path:String,
    image: 
    { 
        data: Buffer,
        contentType: String 
    },
});

module.exports = mongoose.model('Story', storySchema);
