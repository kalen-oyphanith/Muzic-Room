const models = require('../models');

const {
  Post,
} = models;

// take all posts and display them
const makerPage = (req, res) => {
  Post.PostModel.findByOwner(req.session.account._id, (err, docs) => {
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

//enables user to make posts
const makePost = (req, res) => {
  if (!req.body.heading || !req.body.blogPost) {
    return res.status(400).json({
      error: 'Heading and blog post are required!',
    });
  }

  const postData = {
    heading: req.body.heading,
    blogPost: req.body.blogPost,
    createdDate: req.body.createdDate,
    nickName: req.body.nickName,
    username: req.session.account.username,
    owner: req.session.account._id,
  };

  const newPost = new Post.PostModel(postData);

  const postPromise = newPost.save();

  postPromise.then(() => res.json({
    redirect: '/maker',
  }));

  postPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Already exists error occured.',
      });
    }

    return res.status(400).json({
      error: 'An error occured',
    });
  });

  return postPromise;
};

// gets the posts from user
const getPosts = (request, response) => {
  const req = request;
  const res = response;

  return Post.PostModel.findByOwner(req.session.account._id, (err, docs) => {
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

// gets all posts from user
const getAllPosts = (request, response) => {
  const res = response;

  return Post.PostModel.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: 'An error occured',
      });
    }

    return res.json({
      posts: docs,
    });
  }).lean();
};

// delete all posts in user's account
const deleteAll = (req, res) => {
  Post.PostModel.deletePosts(req.session.account._id, (err) => {
    if (err) {
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.getPosts = getPosts;
module.exports.getAllPosts = getAllPosts;
module.exports.make = makePost;
module.exports.deleteAll = deleteAll;
