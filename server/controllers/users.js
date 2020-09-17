const User = require('../models/User');
const Post = require('../models/Post');


//Create a new user
const createUser = (req, res, next) =>{
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
};

//Return a list of all users
const getAllUsers = (req, res, next) => {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users});
    });
};


//Return the user with a given id
const getSpecificUser = (req, res, next) =>{
    var id = req.params.id;
    User.findById(id).populate('posts').exec (function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {'message': 'User not found'});
        }
        res.json(user);
    });
};

//add a post to a specific user
const addPostToUser = (req, res, next) =>{
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {'message': 'User not found'});
        }
        var post = new Post(req.body);
        post.save();
        user.posts.push(post);
        user.save();
        res.json(post);
    });
};

//return all posts of a user
const getPostsOfUser = (req, res, next) =>{
    var id = req.params.id;
    User.findById(id).populate('posts').exec(function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {'message': 'User not found'});
        } else if (!user.post_id) {return res.status(404).json({'message':'User has no posts'});}
        res.json(user.posts);
    });
};

// Get a specific post
const getSpecificPostOfUser = (req, res, next) =>{
    var user_id = req.params.user_id;
    var post_id = req.params.post_id;
    User.findById(user_id, function(err, user){
        if(err){
            return next(err);
        }
        if(user === null){
            return res.status(404).json({'Message':'User not found'});
        }
        Post.findById(post_id, function(err, post){
            if(err){
                return next(err);
            }
            if(!post){
                return res.status(404).json({'message': 'Post not found'});
            }
            res.json(post);
        });
    });
};

const deleteSpecificPostOfUser = (req, res, next) =>{
    var user_id = req.params.user_id;
    var post_id = req.params.post_id;
    
    User.findById(user_id, function(err, user){
        if(err){
            return next(err);
        }
        if(user === null){
            return res.status(404).json({'Message':'User not found'});
        }
        Post.findOneAndDelete(post_id, function(err, post){
            if(err){
                return next(err);
            }
            if(!post){
                return res.status(404).json({'message': 'Post not found'});
            }
            res.json(post);
        });
    });
};

// Patch a specific user
const patchSpecificUser = (req, res, next) =>{
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        user.password = (req.body.password || user.password);
        user.name = (req.body.name || user.name);
        user.email = (req.body.email || user.email);
        user.save();
        res.json(user);
    });
};

//Delete a specific user
const deleteSpecificUser = (req, res, next) =>{
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
};

//Delete all users
const deleteAllUsers = (req, res) => {
    User.deleteMany()
        .exec()
        .then(result => {
            if (result.deletedCount === 0) throw 404;
  
            res.status(200).json({
                message: 'All Users deleted.',
                deletedCount: result.deletedCount
            });
        })
        .catch(error => {
            if (error === 404)
                res.status(404).json({ error: 'No Users found.' });
            else res.status(500).json({ error: error });
        });
};

module.exports = {
    createUser,
    getAllUsers,
    getSpecificUser,
    addPostToUser,
    getPostsOfUser,
    getSpecificPostOfUser,
    deleteSpecificPostOfUser,
    patchSpecificUser,
    deleteSpecificUser,
    deleteAllUsers
};
