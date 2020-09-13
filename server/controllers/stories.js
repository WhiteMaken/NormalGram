const Story = require('../models/Story');

const createStories = (req, res, next) => {
    var story = new Story(req.body);
    story.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(story);
    });
}

const getAllStories = (req, res) => {
    const options = {
}



module.exports = {
  getAllStories,
  getStoryWithId,
  createStories,
  putStoryWithId,
  updateStoryById,
  deleteStories,
  deleteStoryWithId,
};
}