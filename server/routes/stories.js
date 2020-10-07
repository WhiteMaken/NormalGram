const express = require('express');
const router = express.Router();

const StoriesController = require('../controllers/stories');

router.get('/', StoriesController.getAllStories);//

router.get('/:id', StoriesController.getStoryByUser);//

router.post('/', StoriesController.createStory);//

router.delete('/', StoriesController.deleteStory);//

router.delete('/:id', StoriesController.deleteStoryWithId);//

router.put('/:id', StoriesController.putStoryWithId);//

router.patch('/:id', StoriesController.updateStoryById);//

module.exports = router;
