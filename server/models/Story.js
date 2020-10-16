var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    contentType:String,
    path:String,
    image: 
    { 
        data: Buffer, 
        contentType: String 
    }  
});

storySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Story', storySchema);
