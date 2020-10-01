var Picture = require('../models/Picture');

// Creating picture (POST)
const creatingPicture = (req, res, next) => {
    var picture = new Picture(req.body);
    picture.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(picture);
    });
};
// Get a picture by ID (GET)
const getPictureById = (req, res, next) => {
    var id = req.params.id;
    Picture.findById(id, function(err, picture) {
        if(picture){res.json(picture);
        } else {
            return res.status(404).json({Message:'Picture not found or deleted'});}
        if (err) { return next(err);}  
    });
};

//Delete a picture by ID (DELETE)
const deletePictureById = (req, res, next) => {
    var id = req.params.id;
    Picture.findOneAndDelete({_id: id}, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({'message': 'Picture not found'});
        }
        res.json({'message':'Picture with ID ' + id+ ' has been deleted'});
    });
};

// Patch a specific picture (PATCH)
const patchSpecificPicture = (req, res, next) =>{
    var id = req.params.id;
    Picture.findById(id, function(err, picture) {
        if (err) { return next(err); }
        if (picture == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        picture.upload_date = (req.body.upload_date || picture.upload_date);
        picture.picture_url = (req.body.picture_url || picture.picture_url);
        picture.save();
        res.json(picture);
    });
};

const getAllPictures = (req, res, next) => {
    Picture.find(function(err, pictures) {
        if (err) {return next(err); }
        res.json({pictures});
    });
};

const deleteAllPictures = (req, res) => {
    Picture.deleteMany()
        .exec()
        .then(result => {
            if (result.deletedCount <= 0) {throw 404;}

            res.status(200).json({
                message: 'All ictures has been deleted.',
                deletedCount: result.deletedCount,  
            });
        })
        .catch(error => {
            if (error === 404) res.status(404).json({ error: 'No Pictures found.' });
            else res.status(500).json({ error: error });
        });
};





module.exports = {creatingPicture, getPictureById,deletePictureById, patchSpecificPicture, getAllPictures, deleteAllPictures };