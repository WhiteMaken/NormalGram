/* eslint-disable linebreak-style */
var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts');

router.get('/:id', PostsController.getPostById);

router.post('/', PostsController.createPost);

router.get('/', PostsController.getAllPosts);

router.delete('/:id', PostsController.deletePostById);

router.delete('/', PostsController.deleteAllPosts);

router.put('/:id', PostsController.putPost);

router.patch('/:id', PostsController.patchSpecificPostText);

router.patch('/:id/pluslikes', PostsController.addLikes);

module.exports = router;
