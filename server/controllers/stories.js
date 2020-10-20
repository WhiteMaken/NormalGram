const Story = require('../models/Story');

//get all stories 
const getAllStories = (req, res, next) => {
    Story.find(function(err, stories) {
        if (err) {return next(err); }
        res.json({'stories': stories});
    });
};

//create a story by the user
const createStory = (req, res, next) => {
    var story = new Story(req.body);
    story.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(story);
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

//return all stories of a user
const getStoryById = (req, res, next) => {
    var id = req.params;
    Story.find({user:id}, function(err, story) {
        if (err) { return next(err); }
        if (story == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(story);
    });
};

// Delete one picture of the story by a user
const deleteStoryWithId = (req, res, next) =>{
    var id = req.params;
    Story.findOneAndDelete({user: id}, function(err, story) {
        if (err) { return next(err); }
        if (story == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        console.log('deleted');
    });
};

module.exports = {
    getAllStories,
    createStory,
    getStoryById, 
    updateStoryById,
    deleteStoryWithId,
};
