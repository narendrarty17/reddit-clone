const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    bannerImage: { type: String, required: true },
    iconImage: { type: String, required: true },
    selectedTopics: { type: [String], required: true },
    isMature: { type: Boolean, default: false },
    visibility: { type: String, enum: ['Public', 'Private'], required: true },
    date: { type: Date, default: Date.now }
});

const CommunitySchema = mongoose.model('community', communitySchema);

module.exports = CommunitySchema;
