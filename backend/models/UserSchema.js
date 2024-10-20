const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);  // Email validation
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    photoURL: { type: String },

    // communities the user has joined, referencing the community schema
    joinedcommunities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community' // Refers to the community schema
    }],

    // Posts created by the user, referencing the post schema
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // Refers to the Post schema
    }],
    dateJoined: { type: Date, default: Date.now } // Date when user registered
});

const UserSchema = mongoose.model('User', userSchema);

module.exports = UserSchema;