// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    communityName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    upvote: {
        type: Number,
        default: 0,
        min: 0
    },
    downvote: {
        type: Number,
        default: 0,
        min: 0
    },
    content: {
        type: {
            type: String,
            enum: ['image', 'url', 'text'], // Allowed types
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    googleId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PostSchema = mongoose.model('Post', postSchema);

module.exports = PostSchema;
