var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts');

router.get('/:id', PostsController.getPostById);

router.post('/', PostsController.createPost);

router.get('/', PostsController.getAllPosts);

module.exports = router;
