const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const fs = require('fs');
const Story = require('../models/Story');

const storage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'uploads'); 
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({storage:storage});

const StoriesController = require('../controllers/stories');

router.get('/', StoriesController.getAllStories);

router.get('/:id', StoriesController.getStoryById);

router.post('/', upload.single('file'),(req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    
    var story = { 
        contentType:req.file.mimetype,
        path:req.file.path,
        image:new Buffer.from(encode_image, 'base64')
    };
    
    Story.collection.insertOne(story,(err, result) => {
        console.log(result);
        if(err) {return console.log(err);}
    
        console.log('Saved to database');
        res.contentType(story.contentType);
        res.send(story.image);
    });
});

router.delete('/', StoriesController.deleteStory);//

router.delete('/:id', StoriesController.deleteStoryWithId);//

router.put('/:id', StoriesController.putStoryWithId);//

router.patch('/:id', StoriesController.updateStoryById);//

module.exports = router;
