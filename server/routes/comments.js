const express = require('express');
const router = express.Router();


var CommentsController = require('../controllers/comments');

router.get('/:id', CommentsController.getCommentById);

router.post('/', CommentsController.creatingComment);

router.delete('/:id', CommentsController.deleteCommentById);

router.patch('/:id', CommentsController.patchSpecificComment);

router.get('/', CommentsController.getAllComments);

router.delete('/', CommentsController.deleteAllComments)

module.exports = router;