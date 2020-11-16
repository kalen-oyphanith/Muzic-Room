const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let PostModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setHeading = (heading) => _.escape(heading).trim();
const setBlogPost = (blogPost) => _.escape(blogPost).trim();

// //// name = heading /////////    age = blogPost     ///////
const PostSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
    set: setHeading,
  },

  blogPost: {
    type: String,
    required: true,
    trim: true,
    set: setBlogPost,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.statics.toAPI = (doc) => ({
  heading: doc.heading,
  blogPost: doc.blogPost,
  createdDate: doc.createdDate,
});

PostSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return PostModel.find(search).select('heading blogPost createdDate').lean().exec(callback);
};

PostModel = mongoose.model('Post', PostSchema);

module.exports.PostModel = PostModel;
module.exports.PostSchema = PostSchema;
