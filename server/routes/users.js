const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const UserController = require('../controllers/users');

router.get('/', UserController.getAllUsers);

router.get('/my/:id', UserController.getSpecificUser);

router.post('/:id/posts', UserController.addPostToUser);

router.get('/:id/posts', UserController.getPostsOfUser);

router.post('/:id/comments', UserController.addCommentToUser);

router.get('/:id/comments', UserController.getCommentsOfUser);

router.get('/:user_id/posts/:post_id', UserController.getSpecificPostOfUser);

router.post('/',UserController.createUser);

router.patch('/:id',UserController.patchSpecificUser);

router.delete('/:id',UserController.deleteSpecificUser);

router.delete('/',UserController.deleteAllUsers);

router.post('/register', UserController.registerNewUser);

router.post('/login', UserController.loginUser);

router.get('/me', auth, UserController.getUserDetails);

module.exports = router;
