const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let PostModel = {};

const convertId = mongoose.Types.ObjectId;
const setPost = (post) => _.escape(post).trim();

const PostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true,
        trim: true,
        set: setPost,
    },
    age: {
        type: Number,
        min: 0,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },

    createdData: {
        type: Date,
        default: Date.now,
    },
});

PostSchema.statics.toAPI = (doc) => ({
    post: doc.post,
    age: doc.age,
});

PostSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return PostModel.find(search).select('post age').lean().exec(callback);
};

PostModel = mongoose.model('Muzic', PostSchema);

module.exports.PostModel = PostModel;
module.exports.PostSchema = PostSchema;
