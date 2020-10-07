const Story = require('../models/Story');
const User = require('../models/User');
const Picture = require('../models/Picture');

//get all stories 
const getAllStories = (req, res) => {
    const options = {
        sort: { published: -1 },
        page: req.query.page === 'undefined' ? 1 : req.query.page,
        limit:
      typeof req.query.limit === 'undefined' || req.query.limit === 'undefined'
          ? 9
          : req.query.limit
    };
    Story.paginate({}, options)
        .then(result => {
            if (!result.totalDocs) throw 404;
            res.status(200).json({
                ...result
            });
        })
        .catch(error => {
            if (error === 404) res.status(404).json({ error: 'No stories found.' });
            else res.status(500).json({ error: error });
        });
};


//create a story by the user
const createStory = async (req, res) => {
    
    try {
        let users_with_story = await Story.find({ story_owner: req.body.id });
        if (users_with_story!=null) {
            return res.status(409).json({
                message: 'user already have active story'
            });
        }
        const story = new Story({
            pictures: req.body.pictures,
            story_owner:req.body.id
        });
        let data = await story.save();
        res.status(201).json({data});
    } catch (err) {
        res.status(400).json({ err: err });
    }};

// Get a specific users story
const getStoryByUser = (req, res, next) =>{
    var user_id = req.params.user_id;
    var story_id = req.params.story_id;
    User.findById(user_id, function(err, user){
        if(err){
            return next(err);
        }
        if(user === null){
            return res.status(404).json({'Message':'User not found'});
        }
        Story.findById(story_id, function(err, story){
            if(err){
                return next(err);
            }
            if(!story){
                return res.status(404).json({'message': 'Story not found'});
            }
            res.json(story);
        });
    });
};
//to replace earlier story with new story
const putStoryWithId = (req, res) => {
    const id = req.params.id;
    /* This didn't work
    Story.findOneAndReplace(id).exec().then(result=>{
        if (err) { return next(err); }
        res.status(200).json({
            message: 'Story replaced.'
          });
    }).catch(error => {
        if (error === 404)
          res.status(404).json({ error: `Story with Id: ${id} not found.` });
        else res.status(500).json({ error: error });
      });
    }
    */
    Story.findById(id, function(err, story){
        if(err){
            return next(err);
        }
        if(story == null){
            return res.status(404).json({'message': 'Story not found'});
        }
        story.unique_views = req.body.unique_views || story.unique_views;
        story.lifespan = req.body.lifespan|| story.lifepsan;
        story.upload_date = req.body.upload_date || story.upload_date;
        story.likes = req.body.likes || story.likes;
        story.story_owner = req.body.story_owner|| story.story_owner;
        story.save();
        res.json(story);
    });
};

//to update stories by id
const updateStoryById = (req, res) => {
    const id = req.params.id;
    Story.findOneAndUpdate({ _id: id }, req.body, { new: true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'story updated.',
                id: result.id,
                unique_views:result.unique_views,
                lifespan:result.lifespan,
                upload_date: result.upload_date,
                likes: result.likes,
            });
        })
        .catch(error => {
            if (error === 404)
                res.status(404).json({ error: `story with ID: ${id} not found.` });
            else res.status(500).json({ error: error });
        });
};
//to delete all stories 
const deleteStory = (req, res) => {
    const id = req.params.id;
    Story.deleteMany()
        .exec()
        .then(result => {
            if (!result ) ;
            res.status(200).json({
                message: 'all stories deleted',
                request: {
                    type:'STORY',
                    url:'http://localhost:3000/api/stories',
                    data:{}
                }
            })
                .catch(error => {
                    if (error === 404)
                        res.status(404).json({error: 'No stories found.' });
                    else res.status(500).json({ error: error });
                });
        });
};
//to delete story with an ID
const deleteStoryWithId = (req, res) => {
    const id = req.params.id;
    Story.findOneAndDelete({ _id: id })
        .exec().then(result=> {
            if (!result) throw 404;
            res.status(200).json({
                message: 'story deleted.',
                ...result._doc,
                request: {
                    type: 'STORY',
                    url: 'http://localhost:3000/api/stories',
                    data: {}
                }
            })
                .catch(error => {
                    if (error === 404)
                        res.status(404).json({ error: `Story with Id: ${id} not found.` });
                    else res.status(500).json({ error: error });
                });
        });
};

module.exports = {
    getAllStories,
    createStory,
    getStoryByUser, 
    putStoryWithId,
    updateStoryById,
    deleteStory,
    deleteStoryWithId,
};
