var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
//var UserModel = require('./User.model');
var Schema = mongoose.Schema;



// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/normalgramDB';

//'mongodb://localhost:27017/normalgramDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());


var UserModel = new Schema({
    username:{
        type: String, 
        unique: true,
        required: true,
        maxlength: 20,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    name: { type: String },
     
    email:{
        type: String,
        unique:true,
        required: true,
        maxlength: 50},
});

var StoryModel = new Schema({
    unique_views:{
        type: Number, 
        required: true,
    },

    lifespan:{
        type:Date,
        required:true,
    },

    upload_date: { 
        type: Date,
        default: Date.now,
    },
     
    likes:{
        type: Number,
        required: true,
    }, 
    story_owner:{
        type: Schema.Types.ObjectID, 
        ref: 'User',
        unique:true}
});

var PostModel = new Schema({
    unique_views:{
        type: Number, 
        required: true,
    },
    text:{
        type:String,
        maxlength: 350,
    },
    upload_date: { 
        type: Date,
        required: true, },
     
    likes:{
        type: Number,
        required: true,},

    owner:{
        type: Schema.Types.ObjectID, 
        ref: 'User',
    } 
});

var PictureModel = new Schema({
    upload_date: { type: Date },
     
    picture_id:{
        type: String,
        required: true,},

    owner:{
        type: Schema.Types.ObjectID, 
        ref: 'Post' || 'Story',
    } 
});

var User = mongoose.model('users', UserModel);
var Story = mongoose.model('stories', StoryModel);
var Post = mongoose.model('posts', PostModel);
var Picture = mongoose.model('pictures', PictureModel);


//creating users
app.post('/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

//creating stories
app.post('/stories', function(req, res, next) {
    var story = new Story(req.body);
    story.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(story);
    });
});

//creating posts
app.post('/posts', function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(post);
    });
});
    
//creating pictures
app.post('/pictures',function(req, res,next) {
    var picture = new Picture(req.body);
    picture.save(function(err) {
        if (err) {return next(err);}
        res.status(201).json(picture);
    });
});


// Return a list of all users
app.get('/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users});
    });
});

// Return a list of every picture a user have
app.get('/pictures/:username', function(req, res, next) {
    var id = req.params.id;
    Picture.findById(id, function(err, picture) {
        if (err) { return next(err); }
        if (picture == null) {
            return res.status(404).json({'message': 'User does not have any pictures'});
        }
        res.json(picture);
    });
});



// Return the user with the given ID
app.get('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

app.patch('/users/:id', function(req, res, next) {
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
});

// Delete the user with the given ID
app.delete('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'Camel not found'});
        }
        res.json(user);
    });
});



// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});





// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;

