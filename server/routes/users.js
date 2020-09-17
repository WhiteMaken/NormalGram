const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getSpecificUser);

router.post('/:id/posts', UserController.addPostToUser);

router.get('/:id/posts', UserController.getPostsOfUser);

router.post('/',UserController.createUser);

router.patch('/:id',UserController.patchSpecificUser);

router.delete('/:id',UserController.deleteSpecificUser);

router.delete('/',UserController.deleteAllUsers);

module.exports = router;
