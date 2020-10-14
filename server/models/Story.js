var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    unique_views:{type: Number, required: true, default:0},
    lifespan:{type:Date, required:true, default: Date.now},
    upload_date: {type: Date, default: Date.now},
    likes:{type: Number, default:0}, 
});

storySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Story', storySchema);
