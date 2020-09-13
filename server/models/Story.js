var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
//for pagination purposes
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

//likes and unique_views set to zero 
var storyModel = new Schema({
    unique_views:{
        type: Number, 
        required: true,
        default:0
    },

    lifespan:{
        type:Date,
        required:true,
    },

    upload_date: { 
        type: Date,
        default: Date.now,
    },
     
    likes:{
        type: Number,
        required: true,
        default:0,
    }, 
    
    story_owner:{
        type: Schema.Types.ObjectID, 
        ref: 'User',
        unique:true}
});

storyModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Story', storyModel);
