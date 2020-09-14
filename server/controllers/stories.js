const Story = require('../models/Story');

//create a story by the user
const createStories = (req, res, next) => {
    var story = new Story(req.body);
    Story.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(story);
    }).carch(error => {
        res.status(500).json({ error: error });
      });
};

//get stories of a user with his ID
const getStoriesById = (req, res) => {
    const id = req.params.id;
    Story.findById(id)
    .select('-__v')//version key
    .populate('user').exec().then(doc =>{ 
        if (!doc) throw 404;
    res.status(200).json({
        id: doc.id,
        unique_views:doc.unique_views,
        lifespan_views:doc.lifespan,
        upload_date: doc.upload_date,
        likes: doc.likes,
        request: [
          {
            type: 'GET',
            url: 'http://localhost:3000/api/stories'
          },
          {
            type: 'GET',
            url: `http://localhost:3000/api/users/${doc.user}`
          }
        ]
      }).catch(error=>{
          if (error === 404)
    res.status(404).json({error:'Story of the user not found.' });
    else res.status(500).json({ error: error });
});
    })
}



module.exports = {
  createStories,
  getStoriesById, 
  putStoryWithId,
  updateStoryById,
  deleteStories,
  deleteStoryWithId,
};

