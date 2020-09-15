const Story = require('../models/Story');

//create a story by the user
const createStories = (req, res, next) => {
    var story = new Story(req.body);
    Story.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(story);
    }).catch(error => {
        if (error === 404)
          res.status(404).json({ error: `Story not found.` });
        else res.status(500).json({ error: error });
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
//to replace earlier story with new story
const putStoryWithId = (req, res) => {
    const id = req.params.id;
    Story.findOneAndReplace({ _id: doc.id }, req.body, { new: true }).exec.then(result=>{
        if (err) { return next(err); }
        res.status(200).json({
            message: 'Story replaced.',
            ...result._doc
          });
    }).catch(error => {
        if (error === 404)
          res.status(404).json({ error: `Story with Id: ${id} not found.` });
        else res.status(500).json({ error: error });
      });
    }

    const updateStoryById = (req, res) => {
        const id = req.params.id;
        Story.findOneAndUpdate({ _id: id }, req.body, { new: true })
          .exec()
          .then(result => {
            res.status(200).json({
              message: 'story updated.',
              id: result.id,
              unique_views:result.unique_views,
              lifespan_views:result.lifespan,
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

const deleteStories = (res) => {
        Story.deleteMany()
          .exec()
          .then(result => {
            if (result.data === empty ) ;
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
    }

    



module.exports = {
  createStories,
  getStoriesById, 
  putStoryWithId,
  updateStoryById,
  deleteStories,
  deleteStoryWithId,
}
