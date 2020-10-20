var Comment = require('../models/Comment');

// Creating picture (POST)
const creatingComment = (req, res, next) => {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(comment);
    });
};
// Get a picture by ID (GET)
const getCommentById = (req, res, next) => {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        if(comment){res.json(comment);
        } else {
            return res.status(404).json({Message:'Comment not found or deleted'});}
        if (err) { return next(err);}  
    });
};

//Delete a picture by ID (DELETE)
const deleteCommentById = (req, res, next) => {
    var id = req.params.id;
    Comment.findOneAndDelete({_id: id}, function(err, comment) {
        if (err) { return next(err); }
        if (comment == null) {
            return res.status(404).json({'message': 'Comment not found'});
        }
        res.json({'message':'Comment with ID ' + id+ ' has been deleted'});
    });
};

// Patch a specific picture (PATCH)
const patchSpecificComment = (req, res, next) =>{
    var id = req.params.id;
    Comment.updateOne({_id:id}, {$set : req.body}, function(err, updatedComment) {
        if (err) { return next(err); }
        if (updatedComment == null) {
            return res.status(404).json({'message': 'Comment not found'});
        }
        
        res.status(200).json(updatedComment);
    });
};

const getAllComments = (req, res, next) => {
    Comment.find(function(err, comments) {
        if (err) {return next(err); }
        res.json({comments});
    });
};

const deleteAllComments = (req, res) => {
    Comment.deleteMany()
        .exec()
        .then(result => {
            if (result.deletedCount <= 0) {throw 404;}

            res.status(200).json({
                message: 'All comments has been deleted.',
                deletedCount: result.deletedCount,  
            });
        })
        .catch(error => {
            if (error === 404) res.status(404).json({ error: 'No Comments found.' });
            else res.status(500).json({ error: error });
        });
};

module.exports = {creatingComment, getCommentById,deleteCommentById, patchSpecificComment, getAllComments, deleteAllComments };