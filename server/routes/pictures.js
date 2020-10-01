const express = require('express');
const { getAllPictures } = require('../controllers/pictures');
const router = express.Router();

var PicturesController = require('../controllers/pictures');

router.get('/:id', PicturesController.getPictureById);

router.post('/', PicturesController.creatingPicture);

router.delete('/:id', PicturesController.deletePictureById);

router.patch('/:id', PicturesController.patchSpecificPicture);

router.get('/', PicturesController.getAllPictures);

router.delete('/', PicturesController.deleteAllPictures)

module.exports = router;