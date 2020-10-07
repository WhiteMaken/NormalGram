/* eslint-disable linebreak-style */
var Post = require('../models/Post');

//creating posts
const createPost = (req, res, next) => {
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(post);
    });
};

//get post by id
const getPostById = (req, res, next) => {
    var id = req.params.id;
    Post.findById(id,function(err, post) {
        if(post){res.json(post);
        }   else {
            return res.status(404).json({Message:'Post not found'});}
        if (err) { return next(err);}  
        
    });
    
};

//get all posts
const getAllPosts = (req, res, next) => {
    Post.find().sort({likes: 1}).exec(function(err, posts) {
        if (err) {return next(err); }
        res.json(posts);
    });
};

//Delete all posts in the database
const deleteAllPosts = (req, res) => {
    Post.deleteMany()
        .exec()
        .then(result => {
            if (result.deletedCount <= 0) {throw 404;}

            res.status(200).json({
                message: 'All posts has been deleted.',
                deletedCount: result.deletedCount,  
            });
        })
        .catch(error => {
            if (error === 404) res.status(404).json({ error: 'No Posts found.' });
            else res.status(500).json({ error: error });
        });
};


//Delete a post by ID
const deletePostById = (req, res, next) => {
    var id = req.params.id;
    Post.findOneAndDelete({_id: id}, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json({'message':'Post with ID' + id+ ' has been deleted'});
    });
};

//update post with put request

const putPost = (req, res, next) => {
    var id = req.params.id;
    Post.findById(id, function(err, post){
        if(err){
            return next(err);
        }
        if(post == null){
            return res.status(404).json({'message': 'Post not found'});
        }
        post.unique_views = req.body.unique_views || post.unique_views;
        post.text = req.body.text|| post.text;
        post.upload_date = req.body.upload_date || post.upload_date;
        post.likes = req.body.likes || post.likes;
        post.save();
        res.json(post);
    });
};

//Patch the text of a speicific post(editing)
const patchSpecificPostText = (req, res, next) =>{
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        post.text = (req.body.text || post.text);
        post.save();
        res.json(post);
    });
};

//Add a like to a post
const addLikes = (req, res, next) =>{
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        post.likes = post.likes+1;
        post.save();
        res.json(post);
    });
};


module.exports = {createPost, getPostById, getAllPosts, deletePostById, putPost, deleteAllPosts, patchSpecificPostText, addLikes};
