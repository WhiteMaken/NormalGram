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
    User.findById(req.params.id, function(err, user) {
    if (err) { return next(err); }
    if (user == null) {
    return res.status(404).json(
    {"message": "User not found"});
    }
    res.json(user);
    });
};

//add a post to a specific user
//need to add some error handling
const addPostToUser = (req, res, next) =>{
    var id = req.params.id;
    User.findById(req.params.id, function(err, user) {
    if (err) { return next(err); }
    if (user == null) {
    return res.status(404).json(
    {"message": "User not found"});
    }
    var post = new Post(req.body);
    user.posts.push(post);
    user.save();
    res.json(user);
    });
};

//return all posts of a user
//need to add error handling
const getPostsOfUser = (req, res, next) =>{
    var id = req.params.id;
    User.findById(req.params.id, function(err, user) {
    if (err) { return next(err); }
    if (user == null) {
    return res.status(404).json(
    {"message": "User not found"});
    }
    res.json(user.posts);
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
const deleteAllUsers = (req, res, next) => {
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
    patchSpecificUser,
    deleteSpecificUser,
    deleteAllUsers
  };
