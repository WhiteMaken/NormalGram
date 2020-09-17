var express = require('express');
var router = express.Router();

var PicturesController = require('../controllers/pictures');

router.get('/:id', PicturesController.getPictureById);

router.post('/', PicturesController.creatingPicture);

router.delete('/:id', PicturesController.deletePictureById);

module.exports = router;