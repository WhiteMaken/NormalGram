const express = require('express');
const router = express.Router();

var PicturesController = require('../controllers/pictures');

router.get('/:id', PicturesController.getPostById);
router.post('/', PicturesController.getPostById);
router.delete('/:id', PicturesController.getPostById);

module.exports = router;