var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    unique_views:{type: Number, required: true, default:0},
    createdAt: {type: Date, default: Date.now, expires:'1440m'},
    likes:{type: Number,required: true, default:0, max:10}, 
    story_owner:{type: Schema.Types.ObjectID, ref: 'User', unique:true, required:true},
    pictures: [{ type: Schema.Types.ObjectID, ref: 'Picture'}]
});

storySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Story', storySchema);