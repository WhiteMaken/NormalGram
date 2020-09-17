const Story = require('../models/Story');

//create a story by the user
const createStory = (req, res, next) => {
  var story = new Story(req.body);
  story.save(function(err) {
      if (err) { return next(err); }
      res.status(201).json(story);
  });
};

//get stories of a user with his ID
const getStoryById = (req, res) => {
    const id = req.params.id;
    Story.findById(id)
    .select('-__v')//version key
    .populate('user').exec().then(doc =>{ 
        if (!doc) ;
    res.status(200).json({
        id: doc.id,
        unique_views:doc.unique_views,
        lifespan:doc.lifespan,
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
    }
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
    }

module.exports = {
  createStory,
  getStoryById, 
  putStoryWithId,
  updateStoryById,
  deleteStory,
  deleteStoryWithId,
}
