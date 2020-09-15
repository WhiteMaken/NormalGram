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
    Post.findById(id, function(err, post) {
        if (err) { return next(err);}
        if (post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
};

//get all posts
const getAllPosts = (req, res, next) => {
    Post.find(function(err, posts) {
        if (err) {return next(err); }
        res.json({'posts': posts});
    });
};



module.exports = {createPost, getPostById, getAllPosts};
