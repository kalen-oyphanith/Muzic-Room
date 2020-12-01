const models = require('../models');

const {
  Muzic,
} = models;

const makerPage = (req, res) => {
  Muzic.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred!',
      });
    }

    return res.render('app', {
      csrfToken: req.csrfToken(),
      posts: docs,
    });
  });
};

const makePost = (req, res) => {
  if (!req.body.post || !req.body.age) {
    return res.status(400).json({
      error: 'Text is needed!',
    });
  }

  const postData = {
    post: req.body.post,
    age: req.body.age,
    owner: req.session.account._id,
  };

  const newPost = new Muzic.DomoModel(postData);

  const postPromise = newPost.save();

  postPromise.then(() => res.json({
    redirect: '/maker',
  }));

  postPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'post already exists.',
      });
    }

    return res.status(400).json({
      error: 'An error occured',
    });
  });

  return postPromise;
};

const getPosts = (request, response) => {
  const req = request;
  const res = response;

  return Muzic.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.json({
      posts: docs,
    });
  });
};

module.exports.makerPage = makerPage;
module.exports.getPosts = getPosts;
module.exports.make = makePost;
